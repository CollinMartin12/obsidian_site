#### Main criteria of CNN
• Specialized kind of neural network for processing data that has a known grid-like topology
• Specialized kind of neural network for processing data that has a known grid-like topology
• Sparsity & Weight Sharing: efficient front-end for NN feedforward structures

#### What is a convolution when working with images?
![[attachments/Pasted image 20260204171329.png]]
![[attachments/Pasted image 20260204171350.png]]

The weights of a Neural Network for a picture grows with the square of the number of pixels, making it unfeasible to train and obtain a model. 
ConvNet architectures make the explicit assumption that the inputs are images, which allows us to **encode certain properties into the architecture**. These include, translation, cropping, dilation, contrast, etc.

### The Input: Image Flattening
![[Pasted image 20260224103437.png]]

An image is naturally 3D (width×height×channels). For a standard CIFAR-10 image, that is 32×32×3.
- To process this using standard matrix multiplication, the image is "stretched" or **flattened** into a single column vector.
- 32×32×3=3072 total pixels. So, the input x is a 3072×1 vector.

The matrix W represents the "knowledge" of the network.
- **Dimensions:** It is a 10×3072 matrix.
- **Rows as Templates:** Each of the 10 rows in this matrix corresponds to a specific category (e.g., dog, cat, car). You can think of each row as a 3072-dimensional "template" for that class.
    
The Operation (Wx)
The heart of the process is the matrix multiplication y=Wx:
- **The Dot Product:** Each single value in the output (the "activation") is the result of a **dot product** between one row of W and the input vector x.
- **Meaning:** The dot product measures how similar the input image is to that specific row's template. A high number means the image looks a lot like that category's template.

The result is a 10×1 vector.
- Each of these 10 numbers represents a **score** for a specific class.
- For example, if the first number is the highest, the model "thinks" the image is most likely a "plane" (or whatever the first class represents).


### Using Spatial Structure (Local Connectivity)

![[Pasted image 20260224103712.png]]

Instead of looking at the whole picture at once:

- **Patches of Input:** Instead of one neuron looking at all 3072 pixels (as seen in your first image), each neuron in a convolutional layer is only connected to a small **patch** of the input.
    
- **Local Focus:** The diagram shows a neuron (the blue circle) connected only to the four pixels inside the red box. This neuron **only "sees" those values**.
    
- **Why this matters:** This allows the network to recognize small features—like an edge, a curve, or a corner—regardless of where they appear in the image.

#### The Convolution Operation

To "convolve" means to slide the filter over the image spatially to compute **dot products**.

- **The Math:** At each position, the filter performs a 75-dimensional dot product (since 5×5×3=75) plus a bias term.
    
- **One Number:** This specific calculation results in exactly **one number** for that local region.
    
- **The Slide:** The filter repeats this process across every possible spatial location of the 32×32 grid.

The final output of this process is called an **Activation Map**.

- **Mapping Features:** This map represents how strongly the filter's "template" matched different parts of the image.
    
- **Shrinking Dimensions:** In this example, sliding a 5×5 filter over a 32×32 image (with no padding) results in a **28×28×1** activation map.
    
- **Stacked Maps:** If you use multiple filters (e.g., 6 different filters), you would get an output volume with a depth of 6 (28×28×6).

#### The Role of ReLU: Adding Non-Linearity

As seen in the sequence of layers, a ConvNet is not just a series of filters; it is a **sequence of Convolutional Layers interspersed with activation functions** like ReLU.
- **The Problem:** The convolution operation (taking a dot product between a filter and a patch of pixels) is a **linear**calculation. If you only stacked linear layers, the entire network would mathematically behave like a single-layer model, no matter how deep you made it.
    
- **The Solution:** ReLU breaks that linearity. It allows the network to learn more complex features by "deciding" which information is important enough to pass to the next layer.
ReLU is computationally very "cheap" because its math is incredibly simple. It looks at every single value in the **activation map** produced by the convolution layer:

- **If the value is positive:** It keeps the number exactly as it is.
    
- **If the value is negative:** It changes it to **0**.
This means if a filter (like the 5×5×3 one shown) doesn't find the feature it’s looking for in a specific patch, the resulting negative dot product is zeroed out, effectively "turning off" that neuron.
![[Pasted image 20260224104535.png]]

### Strided Convolutions (Strides > 1)

When you increase the stride of a convolutional layer, you are telling the filter to skip over pixels (e.g., jumping 2 pixels at a time instead of 1) while it performs its dot products.

- **It learns:** The crucial part of a strided convolution is that it still uses a filter with **learnable weights**.
    
- **Integrated downsampling:** The network actively learns the best way to summarize the image during the convolution process itself.
    
- **Trend:** Many modern CNN architectures (like ResNet) prefer using strided convolutions over pooling because it allows the network to figure out the optimal way to downsample the data on its own.
    

### Pooling Layers

Pooling is a completely separate operation from convolution. It is usually inserted _after_ a Convolution/ReLU layer. The most common type is **Max Pooling**.

- **No learning involved:** A pooling layer has **no weights or parameters** to learn. It is a fixed, mathematical rule.
    
- **How it works (Max Pooling):** You define a window (usually 2x2) and a stride (usually 2). The window looks at a 2x2 patch of the activation map, finds the single highest number (the "max"), and throws the rest away. It then slides over and repeats.
    
- **Aggressive summarization:** Because it just takes the maximum value, it essentially says, "Did we find this feature _anywhere_ in this 2x2 patch? If yes, keep the strongest signal and ignore exactly where it was."

### Case Studies

#### 1. LeNet (Specifically LeNet-5, 1998)

Created by Yann LeCun, this is widely considered the "grandfather" of modern CNNs. It was famously used by banks to read handwritten numbers on checks (the MNIST dataset).

- **The Architecture:** It established the classic, foundational pattern of CNNs that you saw in your slides: **Convolution → Pooling → Convolution → Pooling → Fully Connected Layers**.
    
- **Key Innovation:** It proved that networks could learn spatial hierarchies of features automatically, without humans needing to hand-code feature extractors (like edge detectors).
    
- **Limitations:** It was small and applied to very low-resolution, grayscale images (32x32). Computers at the time simply lacked the power to scale this architecture to large, color images.
    

#### 2. AlexNet (2012)

Designed by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton, this is the network that sparked the modern deep learning boom. It absolutely crushed the competition in the 2012 ImageNet challenge (a massive dataset of high-resolution color images).

- **The Architecture:** Structurally, it was very similar to LeNet, but much bigger, wider, and deeper (5 convolutional layers and 3 fully connected layers).
    
- **Key Innovations:** * **ReLU:** It was one of the first major models to use the **ReLU** activation function instead of older functions like Tanh or Sigmoid. As we discussed earlier, this allowed the network to train much faster and avoid stalling.
    
    - **Hardware:** It was famously trained using standard gaming GPUs, proving that parallel processing could handle massive neural networks.
        
    - **Dropout:** It popularized "dropout," a technique that randomly turns off neurons during training to prevent the model from memorizing the data (overfitting).
        

#### 3. ResNet (Residual Network, 2015)

Created by researchers at Microsoft (Kaiming He et al.), ResNet solved a massive problem in deep learning: as networks got deeper (adding more and more layers to learn more complex things), they actually started getting _worse_ at training due to a phenomenon called the "vanishing gradient."

- **Key Innovation:** **Skip Connections** (or Residual Blocks).
    
- **How it works:** Instead of forcing data to flow strictly through every single layer in order, ResNet created "shortcuts." The output of one layer is mathematically added to the output of a layer located deeper in the network.
    
- **The Result:** This allowed researchers to train networks that were hundreds or even thousands of layers deep without the training process breaking down. Almost all modern CNNs use some form of residual connections today.
    

#### 4. NFNet (Normalizer-Free Network, 2021)

Developed by DeepMind, NFNets challenge a staple of modern deep learning: Batch Normalization. For years, almost every network (including ResNets) used Batch Normalization layers to keep data scaled correctly as it passed through the network, which stabilized training.

- **The Problem with Batch Norm:** It is computationally expensive, complicates the training code, and relies heavily on the "batch size" (how many images you train on at once), which can cause memory issues.
    
- **Key Innovation:** NFNets entirely **removed Batch Normalization**. They achieved this by using a new technique called **Adaptive Gradient Clipping (AGC)** and carefully scaling the initial weights of the network.
    
- **The Result:** NFNets achieved state-of-the-art ImageNet accuracy while training faster than their batch-normalized counterparts, proving that networks don't necessarily need normalization layers to reach peak performance.
#pubish #cnn