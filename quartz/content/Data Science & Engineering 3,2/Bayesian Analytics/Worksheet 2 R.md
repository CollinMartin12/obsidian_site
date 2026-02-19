### 1
Read the file Networks.csv which contains a real survey for a study of social networks and their influence on people. The variable Online.shopping contains a “Yes” if the person who filled the survey usually goes shopping online, and a “No” if he/she does not. Using a frequentist approach, answer the following questions:

(a) Obtain the MLE estimation for the probability of online shopping.
```r
n <- nrow(data)
x <- sum(data$Online.shopping == "Yes")
p_hat <- x / n
cat("MLE for Online Shopping Probability:", p_hat, "\n")
```
**MLE for Online Shopping Probability: 0.8238994**

(b) Obtain a 95% confidence interval for the probability of online shopping: 
- i. Using the exact binomial confidence intervals implemented in R. 
	```r
exact_test <- binom.test(x, n, conf.level = 0.95)
exact_ci <- exact_test$conf.int
cat("Exact 95% Confidence Interval:", exact_ci[1], "to", exact_ci[2], "\n")
	```
*Exact 95% Confidence Interval: 0.7774965 to 0.8641475*
- ii. Using the asymptotic approximation of a proportion distribution.
```r
z <- qnorm(0.975) 
se <- sqrt((p_hat * (1 - p_hat)) / n)
lower_asymp <- p_hat - z * se
upper_asymp <- p_hat + z * se
```
*Asymptotic 95% Confidence Interval: 0.7820343 to 0.8657645*

(c) Perform a hypothesis test to decide if the probability of online shopping is larger than 0.8 at the level alpha = 0.05: i. Using the exact binomial test implemented in R. ii. Using the asymptotic approximation of a proportion distribution.
```r
  x <- sum(data$Online.shopping == "Yes")
  n <- nrow(data)
  
  binom_result <- binom.test(x = x, n = n, p = 0.8, alternative = "greater")
  print(binom_result)
```
*data:  x and n
number of successes = 262, number of trials = 318, p-value = 0.1597
alternative hypothesis: true probability of success is greater than 0.8
95 percent confidence interval:
 0.7849741 1.0000000
sample estimates:
probability of success 0.8238994*

(d) Predict the probability that among the next 10 respondents to the survey, you observe 8 individuals who usually go shopping online.
