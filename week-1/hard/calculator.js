class Calculator{
    result = 0;
    add(number){
        this.result += number
       }

    sub(number){
        if(this.result == 0){
            this.result = number  
        } 
        else {
            this.result -= number
        }
       }

    mul(number){
        if(this.result == 0){
            this.result = number  
        } 
        else {
            this.result *= number
        }
    }

    div(number) {
        if (this.result === 0) {
            this.result = number; // Set result to number if it's currently 0
        } else {
            if (number === 0) {
                throw new Error("Division by zero is not allowed.");
            }
            this.result /= number;
        }
    }
    
    getResult(){
        return this.result
    }

    clear()
    {
        this.result = 0
    }

    calculate(expression){
            let Expression = expression.replace(/\s+/g,"")
            if (!/^\d+(\.\d+)?[+\-*/()0-9.]*$/.test(Expression)){
                console.log("Enter proper expression")
            }
            try {
                this.result = eval(Expression)
            }
            catch(e){
                console.log(e)
            }
        }

}


let calculator = new Calculator()
calculator.calculate("10 + 2 * (6 - (4 + 1) / 2) + 7");
console.log(calculator.getResult())
