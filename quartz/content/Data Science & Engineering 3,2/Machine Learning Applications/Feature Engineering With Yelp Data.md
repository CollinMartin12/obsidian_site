Machine Learning Applications - *3rd year 2nd term*
Collin Martin

### **2. Data Preprocessing & Initial Filtering**

To focus the analysis, we filter the raw dataset for relevance:

- **Categories**: Keep only businesses containing the keyword "Restaurants".
    
- **Operational Status**: Keep only businesses that are currently open (`is_open = 1`).

![[attachments/Pasted image 20260203195847.png]]

First we are asked to filter content by the following criteria:
- Keep restaurants that are open `is_open = 1`

```python
def get_category(df, category='Restaurants'):

categories_ = df["categories"].dropna()

is_member = categories_[categories_.apply(lambda x:category in x.split(", "))]

return df.loc[is_member.index].copy()


data_yelp_df = get_category(data_yelp_df)
```

- `is_member` is a boolean that returns whether or 'Restaurants' is in the category for all the rows of data. 
- `df.loc[index]` returns the data points of every is_member index

Questions `
`Strings or Finding keywords in a python data set`


Next we notice the following:
![[attachments/Pasted image 20260203195724.png]]
Since the ratings are incremental values where a rating is a float value, it makes the most sense to use a regression technique over classification. 

### **2.1 - 2.4 Baseline Regression Models**
So far we are given a data set of yelp reviews, we have dropped null categories and only kept the rows in which the category contains `Restaraunts`. Now we want to know which of the varaibels follow the linear relationship with Ratings. Our current best option, `review_count`, as the correlation and the best fit simple line can be seen below.
![[attachments/Pasted image 20260203200352.png]]


We analyzed which variables share a linear relationship with ratings. `review_count` was identified as the most promising feature.

#### **Model Comparison**

The following models were tested to evaluate the impact of feature selection and transformations:

1. **Linear Regression** (Baseline): `Review Count` → `Rating`.
    
2. **K-NN Regressor**: `Lat + Long + Review Count` → `Rating`.
    
3. **Log-Transformed K-NN**: `Lat + Long + log10(Review Count)` → `Rating`.
    

**Key Finding**: Using the logarithm of the review count significantly improved the $R^2$ score (from 0.019 to 0.098), as it reduces the skewness of the count data.
```markdown
{'linear_regression': {'weights': array([0.00058963]), 'intercept': np.float64(3.395217653590921), 'mse': 0.6843743355525993, 'r2': 0.019667929028433506}, 'knn_regressor': {'best_k ': 50, 'mse': 0.6644327480325707, 'r2': 0.048233257645242666}, 'knn_regressor_with_review_count': {'best_k ': 250, 'mse': 0.6355372988218169, 'r2': 0.08962454614754933}, 'knn_regressor_log_review_counts': {'best_k ': 100, 'mse': 0.6293704009916754, 'r2': 0.0984583194310128}}
```

![[attachments/Pasted image 20260204114702.png]]


### **2.5 Feature Scaling (Standardization)**

Distance-based models like K-NN are highly sensitive to the scale of input variables. `review_count` (ranging from 1 to thousands) would dominate `latitude` (ranging from ~30 to ~50).

**Solution**: Use `StandardScaler` to transform data to zero mean and unit standard deviation.

- **Implementation**: We use a Scikit-Learn `Pipeline` to automate scaling during cross-validation, preventing data leakage.


Remember that within *scikit learn* we can automate scaling using the functionality [`Pipeline`](https://scikit-learn.org/stable/modules/classes.html?highlight=pipeline#module-sklearn.pipeline).

```python
from sklearn.preprocessing import StandardScaler

from sklearn.pipeline import Pipeline

from sklearn.model_selection import GridSearchCV

# Pipeline definition. List with all the stages of the pipeline

knn_pipe = Pipeline([('scaler', StandardScaler()), ('regressor',KNeighborsRegressor())])

# Dictionary with hyperparameters for all the stages of the pipeline,

# that will be tuned with crossvalidation

params_pipe = {'regressor__n_neighbors':[1,5,10,25,50,100,250,500],

'scaler':[StandardScaler(),'passthrough']}

# 'passthrough' means skip this stage.

# This way we can estimate with crossvalidation if scaling was a good idea or not

# set up the grid to optimize the hyperparameters and train the pipeline stages

grid_pipe_log = GridSearchCV(knn_pipe, param_grid= params_pipe, cv=5)

grid_pipe_log.fit(X_train_log, Y_train)

print("Score with the training data R^2={0:.4f}".format(grid_pipe_log.score(X_train_log, Y_train)))

print("Score with the test data R^2={0:.4f}".format(grid_pipe_log.score(X_test_log, Y_test)))

print("Hyperparameters choosen with cross-validation")

print(grid_pipe_log.best_params_)

global_results['knn + scale geo + log review'] = grid_pipe_log.score(X_test_log, Y_test)
```


### **2.6 Removing Geographic Outliers**

Many restaurants are located in isolated areas or cities with very sparse data. These "atypical" data points can degrade model performance because the model cannot learn a reliable distribution from so few samples.

#### **Technique: Novelty Detection**

Instead of manually filtering by city, we use geographical coordinates ($Lat$, $Long$) as inputs to a novelty detection model (like **Isolation Forest** or **Local Outlier Factor**).

- **Process**: Visualize the distribution in 2D space, adjust the "contamination" percentage (expected outliers), and remove these points from both the training and test sets.
- 
![[attachments/Pasted image 20260204114958.png]]

#### To be finished
#publish