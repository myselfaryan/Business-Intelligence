import pandas as pd

def clean_sales_data(df):
    print("Cleaning Sales Data...")
    # Remove duplicates
    df.drop_duplicates(inplace=True)
    # Correct column names (example: ensure consistent casing)
    df.columns = [col.replace(" ", "_").replace("-", "_") for col in df.columns]
    # Format data types
    df["Order_Date"] = pd.to_datetime(df["Order_Date"])
    df["Unit_Price"] = pd.to_numeric(df["Unit_Price"])
    df["Quantity"] = pd.to_numeric(df["Quantity"])
    df["Revenue"] = pd.to_numeric(df["Revenue"])
    return df

def clean_hr_data(df):
    print("Cleaning HR Data...")
    df.drop_duplicates(inplace=True)
    df.columns = [col.replace(" ", "_").replace("-", "_") for col in df.columns]
    df["Termination_Date"] = df["Termination_Date"].fillna("N/A") # This line is specific to HR data
    df["Hire_Date"] = pd.to_datetime(df["Hire_Date"])
    df["Annual_Salary"] = pd.to_numeric(df["Annual_Salary"])
    return df

def clean_finance_data(df):
    print("Cleaning Finance Data...")
    df.drop_duplicates(inplace=True)
    df.columns = [col.replace(" ", "_").replace("-", "_") for col in df.columns]
    df["Month"] = pd.to_datetime(df["Month"])
    df["Budget"] = pd.to_numeric(df["Budget"])
    df["Actual"] = pd.to_numeric(df["Actual"])
    df["Variance"] = pd.to_numeric(df["Variance"])
    return df

# Load raw data
sales_df = pd.read_csv("data/raw/sales_data.csv")
hr_df = pd.read_csv("data/raw/hr_data.csv")
finance_df = pd.read_csv("data/raw/finance_data.csv")

# Clean data
sales_cleaned_df = clean_sales_data(sales_df)
hr_cleaned_df = clean_hr_data(hr_df)
finance_cleaned_df = clean_finance_data(finance_df)

# Export cleaned data to CSV
sales_cleaned_df.to_csv("data/cleaned/sales_cleaned.csv", index=False)
hr_cleaned_df.to_csv("data/cleaned/hr_cleaned.csv", index=False)
finance_cleaned_df.to_csv("data/cleaned/finance_cleaned.csv", index=False)

print("Data cleaning complete. Cleaned files saved to data/cleaned/ folder.")

# Create data dictionaries
def create_data_dictionary(df, name):
    data_dict = {
        "Column Name": [],
        "Data Type": [],
        "Description": [],
        "Example Value": []
    }
    for col in df.columns:
        data_dict["Column Name"].append(col)
        data_dict["Data Type"].append(str(df[col].dtype))
        data_dict["Description"].append("") # Placeholder for description
        data_dict["Example Value"].append(df[col].sample(1).iloc[0])
    
    dict_df = pd.DataFrame(data_dict)
    dict_df.to_csv(f"documentation/{name}_data_dictionary.csv", index=False)
    print(f"Data dictionary for {name} created.")

create_data_dictionary(sales_cleaned_df, "sales")
create_data_dictionary(hr_cleaned_df, "hr")
create_data_dictionary(finance_cleaned_df, "finance")

print("Data dictionaries created and saved to documentation/ folder.")

