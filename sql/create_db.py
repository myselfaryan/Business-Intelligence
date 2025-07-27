import sqlite3
import pandas as pd

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except sqlite3.Error as e:
        print(e)
    return conn

def import_csv_to_db(conn, csv_file, table_name):
    df = pd.read_csv(csv_file)
    df.to_sql(table_name, conn, if_exists='replace', index=False)
    print(f'Table {table_name} created and data imported from {csv_file}')

def execute_sql_from_file(conn, sql_file):
    with open(sql_file, 'r') as f:
        sql_script = f.read()
    cursor = conn.cursor()
    cursor.executescript(sql_script)
    conn.commit()
    print(f'Executed SQL script from {sql_file}')

if __name__ == '__main__':
    database = 'bi_data.db'
    conn = create_connection(database)

    if conn is not None:
        # Import cleaned CSVs
        import_csv_to_db(conn, 'data/cleaned/sales_cleaned.csv', 'sales')
        import_csv_to_db(conn, 'data/cleaned/hr_cleaned.csv', 'hr')
        import_csv_to_db(conn, 'data/cleaned/finance_cleaned.csv', 'finance')

        # Create SQL files for views and KPIs
        with open('sql/sales_kpis.sql', 'w') as f:
            f.write("""
            -- Sales Growth Rate (Year-over-Year)
            CREATE VIEW Sales_Growth_Rate AS
            SELECT
                strftime('%Y', Order_Date) AS Sale_Year,
                SUM(Revenue) AS Total_Revenue,
                LAG(SUM(Revenue), 1, 0) OVER (ORDER BY strftime('%Y', Order_Date)) AS Previous_Year_Revenue,
                (SUM(Revenue) - LAG(SUM(Revenue), 1, 0) OVER (ORDER BY strftime('%Y', Order_Date))) * 100.0 / LAG(SUM(Revenue), 1, 0) OVER (ORDER BY strftime('%Y', Order_Date)) AS Growth_Rate_Percent
            FROM sales
            GROUP BY Sale_Year;

            -- Monthly Sales Trends
            CREATE VIEW Monthly_Sales_Trends AS
            SELECT
                strftime('%Y-%m', Order_Date) AS Sale_Month,
                Region,
                SUM(Revenue) AS Monthly_Revenue
            FROM sales
            GROUP BY Sale_Month, Region
            ORDER BY Sale_Month, Region;

            -- Top Products by Revenue
            CREATE VIEW Top_Products_Revenue AS
            SELECT
                Product,
                Category,
                SUM(Revenue) AS Total_Revenue
            FROM sales
            GROUP BY Product, Category
            ORDER BY Total_Revenue DESC
            LIMIT 10;
            """)
        
        with open('sql/hr_kpis.sql', 'w') as f:
            f.write("""
            -- Employee Headcount by Department
            CREATE VIEW Employee_Headcount_Department AS
            SELECT
                Department,
                COUNT(Employee_ID) AS Headcount
            FROM hr
            WHERE Is_Active = 'True'
            GROUP BY Department;

            -- Employee Attrition Rate
            CREATE VIEW Employee_Attrition_Rate AS
            SELECT
                strftime('%Y', Hire_Date) AS Year,
                COUNT(CASE WHEN Is_Active = 'False' THEN Employee_ID END) * 100.0 / COUNT(Employee_ID) AS Attrition_Rate_Percent
            FROM hr
            GROUP BY Year;

            -- Average Salary by Department and Job Level
            CREATE VIEW Average_Salary_Department_JobLevel AS
            SELECT
                Department,
                Job_Level,
                AVG(Annual_Salary) AS Average_Salary
            FROM hr
            GROUP BY Department, Job_Level
            ORDER BY Department, Job_Level;
            """)

        with open('sql/finance_kpis.sql', 'w') as f:
            f.write("""
            -- Budget vs Actual by Category
            CREATE VIEW Budget_vs_Actual_Category AS
            SELECT
                Month,
                Category,
                Budget,
                Actual,
                (Actual - Budget) AS Difference,
                (Actual - Budget) * 100.0 / Budget AS Variance_Percent
            FROM finance;

            -- Profit Margin per Region (assuming Revenue is a category in finance data)
            CREATE VIEW Profit_Margin_Region AS
            SELECT
                Month,
                Region,
                SUM(CASE WHEN Category = 'Revenue' THEN Actual ELSE 0 END) AS Total_Revenue,
                SUM(CASE WHEN Category = 'Operations Cost' THEN Actual ELSE 0 END) AS Operations_Cost,
                SUM(CASE WHEN Category = 'Marketing Spend' THEN Actual ELSE 0 END) AS Marketing_Spend,
                SUM(CASE WHEN Category = 'Salaries' THEN Actual ELSE 0 END) AS Salaries_Cost,
                (SUM(CASE WHEN Category = 'Revenue' THEN Actual ELSE 0 END) -
                 SUM(CASE WHEN Category = 'Operations Cost' THEN Actual ELSE 0 END) -
                 SUM(CASE WHEN Category = 'Marketing Spend' THEN Actual ELSE 0 END) -
                 SUM(CASE WHEN Category = 'Salaries' THEN Actual ELSE 0 END)) * 100.0 /
                SUM(CASE WHEN Category = 'Revenue' THEN Actual ELSE 0 END) AS Profit_Margin_Percent
            FROM finance
            GROUP BY Month, Region;
            """)

        execute_sql_from_file(conn, 'sql/sales_kpis.sql')
        execute_sql_from_file(conn, 'sql/hr_kpis.sql')
        execute_sql_from_file(conn, 'sql/finance_kpis.sql')

        conn.close()
        print('Database setup complete. Tables and views created.')
    else:
        print('Error! Cannot create the database connection.')


