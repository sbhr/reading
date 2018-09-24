# condig: utf-8


# Stochastic Gradient Descent
class SGD:
    def __init__(self, lr=0.01):
        # lr = learning rate
        self.lr = lr

    def update(self, params, grads):
        for i in range(len(params)):
            params[i] -= self.lr * grads[i]
