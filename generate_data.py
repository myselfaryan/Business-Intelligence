import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

# Define constants
regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"]
departments = ["Sales", "Marketing", "Engineering", "HR", "Finance", "Operations", "Customer Support"]
product_categories = ["Electronics", "Software", "Services", "Hardware", "Consulting"]
products = [
    "Product A", "Product B", "Product C", "Product D", "Product E",
    "Product F", "Product G", "Product H", "Product I", "Product J"
]

# Generate date range for 2 years
start_date = datetime(2022, 1, 1)
end_date = datetime(2023, 12, 31)
date_range = pd.date_range(start=start_date, end=end_date, freq="D").tolist() # Convert to list

print("Generating Sales Data...")
# SALES DATA
sales_records = []
for i in range(5000):  # 5000 sales records
    order_date = random.choice(date_range)
    region = random.choice(regions)
    product = random.choice(products)
    category = random.choice(product_categories)
    
    # Base price varies by product and region
    base_price = random.uniform(50, 2000)
    if region == "North America":
        price_multiplier = 1.2
    elif region == "Europe":
        price_multiplier = 1.1
    else:
        price_multiplier = 1.0
    
    unit_price = base_price * price_multiplier
    quantity = random.randint(1, 100)
    revenue = unit_price * quantity
    
    # Add some seasonal variation
    if order_date.month in [11, 12]:  # Holiday season
        revenue *= random.uniform(1.1, 1.3)
    
    sales_records.append({
        "Order_ID": f"ORD-{i+1:05d}",
        "Order_Date": order_date.strftime("%Y-%m-%d"),
        "Region": region,
        "Product": product,
        "Category": category,
        "Unit_Price": round(unit_price, 2),
        "Quantity": quantity,
        "Revenue": round(revenue, 2),
        "Customer_ID": f"CUST-{random.randint(1, 1000):04d}"
    })

sales_df = pd.DataFrame(sales_records)

print("Generating HR Data...")
# HR DATA
hr_records = []
employee_id = 1
for dept in departments:
    # Each department has different number of employees
    if dept == "Engineering":
        num_employees = random.randint(80, 120)
    elif dept == "Sales":
        num_employees = random.randint(60, 90)
    elif dept == "Marketing":
        num_employees = random.randint(30, 50)
    else:
        num_employees = random.randint(20, 40)
    
    for i in range(num_employees):
        hire_date = start_date + timedelta(days=random.randint(0, 700))
        
        # Some employees left (attrition)
        is_active = random.choice([True, True, True, True, False])  # 20% attrition
        termination_date = None
        if not is_active:
            termination_date = hire_date + timedelta(days=random.randint(30, 600))
            if termination_date > end_date:
                is_active = True
                termination_date = None
        
        # Salary varies by department and region
        base_salary = {
            "Engineering": random.randint(80000, 150000),
            "Sales": random.randint(60000, 120000),
            "Marketing": random.randint(55000, 100000),
            "Finance": random.randint(65000, 130000),
            "HR": random.randint(50000, 90000),
            "Operations": random.randint(45000, 85000),
            "Customer Support": random.randint(40000, 70000)
        }
        
        region = random.choice(regions)
        salary = base_salary[dept]
        if region == "North America":
            salary *= random.uniform(1.1, 1.3)
        elif region == "Europe":
            salary *= random.uniform(1.0, 1.2)
        
        hr_records.append({
            "Employee_ID": f"EMP-{employee_id:05d}",
            "Department": dept,
            "Region": region,
            "Hire_Date": hire_date.strftime("%Y-%m-%d"),
            "Termination_Date": termination_date.strftime("%Y-%m-%d") if termination_date else None,
            "Is_Active": is_active,
            "Annual_Salary": round(salary, 0),
            "Job_Level": random.choice(["Junior", "Mid", "Senior", "Lead", "Manager"])
        })
        employee_id += 1

hr_df = pd.DataFrame(hr_records)

print("Generating Finance Data...")
# FINANCE DATA
finance_records = []
months = pd.date_range(start="2022-01-01", end="2023-12-31", freq="MS")

for month in months:
    for region in regions:
        for category in ["Revenue", "Marketing Spend", "Operations Cost", "Salaries", "R&D Investment"]:
            
            # Budget amounts (planned)
            if category == "Revenue":
                budget = random.randint(800000, 1200000)
            elif category == "Marketing Spend":
                budget = random.randint(50000, 150000)
            elif category == "Operations Cost":
                budget = random.randint(100000, 200000)
            elif category == "Salaries":
                budget = random.randint(300000, 500000)
            else:  # R&D Investment
                budget = random.randint(80000, 120000)
            
            # Actual amounts (with variance)
            variance = random.uniform(0.8, 1.2)
            actual = budget * variance
            
            # Add seasonal effects
            if month.month in [11, 12] and category == "Revenue":
                actual *= random.uniform(1.1, 1.4)
            elif month.month in [1, 2] and category == "Marketing Spend":
                actual *= random.uniform(1.2, 1.5)
            
            finance_records.append({
                "Month": month.strftime("%Y-%m-%d"),
                "Region": region,
                "Category": category,
                "Budget": round(budget, 2),
                "Actual": round(actual, 2),
                "Variance": round(((actual - budget) / budget) * 100, 2)
            })

finance_df = pd.DataFrame(finance_records)

# Save raw data
print("Saving raw datasets...")
sales_df.to_csv("data/raw/sales_data.csv", index=False)
hr_df.to_csv("data/raw/hr_data.csv", index=False)
finance_df.to_csv("data/raw/finance_data.csv", index=False)

print(f"Generated datasets:")
print(f"- Sales: {len(sales_df)} records")
print(f"- HR: {len(hr_df)} records") 
print(f"- Finance: {len(finance_df)} records")
print("\nDatasets saved to data/raw/ folder")

