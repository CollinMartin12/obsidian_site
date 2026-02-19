**Dense Neural Networks**, also known as **Multi-Layer Perceptrons (MLPs)**, are a fundamental building block of deep learning. They are described as a hierarchical composition of simple mathematical functions that allow computers to extract patterns from data without being explicitly programmed.

### Limitations of Linear Models
Monotonicity - Note that we can easily come up with examples that violate monotonicity. Say for example that we want to predict health as a function of body temperature. For individuals with a normal body temperature above 37°C (98.6°F), higher temperatures indicate greater risk. However, if the body temperatures drops below 37°C, lower temperatures indicate greater risk! Again, we might resolve the problem with some clever preprocessing, such as using the distance from 37°C as a feature.

**While there might exist a representation of our data that would take into account the relevant interactions among our features, on top of which a linear model would be suitable, we simply do not know how to calculate it by hand. With deep neural networks, we used observational data to jointly learn both a representation via hidden layers and a linear predictor that acts upon that representation**

### What happens inside a Hidden Layer?

Each neuron in a hidden layer performs a two-step mathematical transformation on the information it receives from the previous layer:

- **Linear Transformation:** It calculates a weighted sum of all its inputs and adds a "bias" term.
    
- **Non-linear Activation:** It passes that sum through an **activation function** (like ReLU, Sigmoid, or Tanh).
    
**Without these hidden layers, the Network we are training would be simple. This would be a simple linear model.**
Example of Hidden Layer:
![[attachments/Pasted image 20260210101934.png]]

### Activation Function
In order to realize the potential of multilayer architectures, we need one more key ingredient: a nonlinear _activation function_  to be applied to each hidden unit following the affine transformation.
Example of Activation Function sigma:
![[attachments/Pasted image 20260210101920.png]]

#### ReLu Function (Rectified Linear Unit)
Given an element x, the function is defined as the maximum of that element and 0:
![[attachments/Pasted image 20260210102224.png]]
Informally, the ReLU function retains only positive elements and discards all negative elements by setting the corresponding activations to 0.
**ReLu Problem such that gradients become 0 -> stopping training**

#### Sigmoid Function
The _sigmoid function_ transforms those inputs whose values lie in the domain , to outputs that lie on the interval (0, 1). For that reason, the sigmoid is often called a _squashing function_: it squashes any input in the range (-inf, inf) to some value in the range (0, 1):
![[attachments/Pasted image 20260210102455.png]]
![[attachments/Pasted image 20260210102544.png]]
**Squeezing Problem**
#### Tanh Function
Like the sigmoid function, the tanh (hyperbolic tangent) function also squashes its inputs, transforming them into elements on the interval between  -1 and 1:
![[attachments/Pasted image 20260210102623.png]]

#pubish