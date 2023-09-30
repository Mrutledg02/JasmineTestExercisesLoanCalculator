describe("Utilities test (with setup and tear-down)", function() {
    beforeEach(function () {
      // Set default values for bill amount and tip amount, and submit a payment before each test
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
      submitPaymentInfo();
    });
  
    it('should sum total tip amount of all payments on sumPaymentTotal()', function () {
      // Test whether 'sumPaymentTotal' correctly calculates the total tip amount of all payments
      expect(sumPaymentTotal('tipAmt')).toEqual(20);
  
      // Update input values and submit another payment
      billAmtInput.value = 200;
      tipAmtInput.value = 40;
      submitPaymentInfo();
  
      // Expectations for the test case
      expect(sumPaymentTotal('tipAmt')).toEqual(60);
    });
  
    it('should sum total bill amount of all payments on sumPaymentTotal()', function () {
      // Test whether 'sumPaymentTotal' correctly calculates the total bill amount of all payments
      expect(sumPaymentTotal('billAmt')).toEqual(100);
  
      // Update input values and submit another payment
      billAmtInput.value = 200;
      tipAmtInput.value = 40;
      submitPaymentInfo();
  
      // Expectations for the test case
      expect(sumPaymentTotal('billAmt')).toEqual(300);
    });
  
    it('should sum total tip percent on sumPaymentTotal()', function () {
      // Test whether 'sumPaymentTotal' correctly calculates the total tip percentage of all payments
      expect(sumPaymentTotal('tipPercent')).toEqual(20);
  
      // Update input values and submit another payment
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
      submitPaymentInfo();
  
      // Expectations for the test case
      expect(sumPaymentTotal('tipPercent')).toEqual(40);
    });
  
    it('should sum tip percent of a single tip on calculateTipPercent()', function () {
      // Test whether 'calculateTipPercent' correctly calculates the tip percentage for a given bill and tip amount
      expect(calculateTipPercent(100, 23)).toEqual(23);
      expect(calculateTipPercent(111, 11)).toEqual(10);
    });
  
    it('should generate new td from value and append to tr on appendTd (tr, value)', function () {
      // Test whether 'appendTd' correctly generates a new 'td' element with the provided value and appends it to the specified 'tr'
      let newTr = document.createElement('tr');
  
      appendTd(newTr, 'test');
  
      // Expectations for the test case
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('test');
    });
  
    it('should generate delete td and append to tr on appendDeleteBtn (tr, type)', function () {
      // Test whether 'appendDeleteBtn' correctly generates a delete 'td' element ('X') and appends it to the specified 'tr'
      let newTr = document.createElement('tr');
  
      appendDeleteBtn(newTr);
  
      // Expectations for the test case
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('X');
    });
  
    afterEach(function() {
      // Reset input values and clear table data after each test
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      allPayments = {};
      paymentId = 0;
    });
  });
  