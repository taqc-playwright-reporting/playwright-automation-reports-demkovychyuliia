import type {
    Reporter, FullConfig, Suite, TestCase, TestResult, FullResult,
  } from '@playwright/test/reporter';
  
  class SummaryReporter implements Reporter {
    private passed = 0;
    private skipped = 0;
    private failed = 0;
    private failedTests: string[] = [];

    onBegin(config: FullConfig, suite: Suite) {
        console.log(`Total tests: ${suite.allTests().length}`);
    }

    onTestEnd(test: TestCase, result: TestResult){
        
        switch (result.status) {
            case 'passed':
                this.passed++;
                break;

            case 'failed':
            case 'timedOut':
                this.failed++;
                this.failedTests.push(test.title);
                break;

            case 'skipped':
                this.skipped++;
                break;

        }
    }

    onEnd(result: FullResult) {
        
        console.log('\n==== Test Summary ====');
        console.log(`Passed: ${this.passed}`);
        console.log(`Failed: ${this.failed}`);
        console.log(`Skipped: ${this.skipped}`);
        
        if (this.failedTests.length >0) {
            console.log('\nFailed tests:');

            this.failedTests.forEach((testTitle) => {
                console.log(`- ${testTitle}`);
            });
        }
        console.log(`\nOverall status: ${result.status}`);
    }


  }

  export default SummaryReporter;
    
  




  