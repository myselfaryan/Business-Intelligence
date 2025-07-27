
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
            