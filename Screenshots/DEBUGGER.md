# Debugging Analysis

## Scenario 1: [POST Endpoint]

-   **Breakpoint Location:** [loanRoutes.ts, 61]
-   **Objective:** [I was trying to figure out the working of the endpoint that is associated with the authorized role of user.]

### Debugger Observations

-   **Variable States:** [Key variables include the authentication and authentication that were associated with the endpoint. Other key variables are listed in the scrennshot 1.]
-   **Call Stack:** [The sequence that leads to the working of the breakpoint started from the endpoint and then to the end it stops at the authorization to check the working]
-   **Behavior:** [At this point of the program the debugger stops at the authorization part and everyting was working a per the expectations. ] 

### Analysis

-   What did you learn from this scenario?
I have learned the working of the authorization role in the endpoint.
-   Did you observe any unexpected behavior? If so, what might be the cause?
NO, eveything was running as per the expectations.
-   Are there areas for improvement or refactoring in this part of the code?
NO, as the code was running all fine.
-   How does this enhance your understanding of the overall project?
It adds a lot to my knowledge for the project as i understand how the authorization works for the Routes Endpoints.

## Scenario 2: [Contoller file]

-   **Breakpoint Location:** [loanController.ts, 23]
-   **Objective:** [I understand the working of create loan function endpoint in the controller file]

### Debugger Observations

-   **Variable States:** [Some of the key variable are listed in the Screensht 2 including request and response. ]
-   **Call Stack:** [The sequence that works from the breakpoint starts from the request and response to the end of craeteLoan that has been taken from the loan service file. ]
-   **Behavior:** [At this point the program and the vontroller files tooks the working from the service file.]

### Analysis

-   What did you learn from this scenario?
I have learned the working of the CreteLoan function from loan service file.
-   Did you observe any unexpected behavior? If so, what might be the cause?
NO
-   Are there areas for improvement or refactoring in this part of the code?
NO 
-   How does this enhance your understanding of the overall project?
It ehnaces the Working of the controllers file createLoan function. 


## Scenario 3: [JEST File Test]

-   **Breakpoint Location:** [laonController.test.ts, 34]
-   **Objective:** [I was investigating the test of the loanController test file.]

### Debugger Observations

-   **Variable States:** [The key variable include laon controller, loan service and many more. ]
-   **Call Stack:** [The sequence of the breakpoint starts from the begning of the service and controller file createloan function. ]
-   **Behavior:** [The jest test are running and all the tests are passed.]

### Analysis

-   What did you learn from this scenario?
I have learned how to debugg the jest test problems of the create loan function.
-   Did you observe any unexpected behavior? If so, what might be the cause?
No, Everything was working as per expectations.
-   Are there areas for improvement or refactoring in this part of the code?
No, there was nothing to refactor in the code.
-   How does this enhance your understanding of the overall project?
Debugging this issue has given me a clearer understanding of how data flows through functions in the project and has emphasized the importance of thorough testing to prevent similar errors.