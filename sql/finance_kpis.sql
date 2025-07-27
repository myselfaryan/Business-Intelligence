
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
            