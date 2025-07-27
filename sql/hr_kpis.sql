
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
            