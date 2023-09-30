describe("Payments test (with setup and tear-down)", function() {
  beforeEach(function () {
    // Set default values for bill amount and tip amount before each test
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
  });

  it('should add a new payment to allPayments on submitPaymentInfo()', function () {
    // Test whether a new payment is correctly added to 'allPayments' when 'submitPaymentInfo' is called
    submitPaymentInfo();

    // Expectations for the test case
    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments['payment1'].billAmt).toEqual('100');
    expect(allPayments['payment1'].tipAmt).toEqual('20');
    expect(allPayments['payment1'].tipPercent).toEqual(20);
  });

  it('should not add a new payment on submitPaymentInfo() with empty input', function () {
    // Test whether no new payment is added to 'allPayments' when 'submitPaymentInfo' is called with empty input
    billAmtInput.value = '';
    submitPaymentInfo();

    // Expectations for the test case
    expect(Object.keys(allPayments).length).toEqual(0);
  });

  it('should payment update #paymentTable on appendPaymentTable()', function () {
    // Test whether 'appendPaymentTable' correctly updates the payment table with payment details
    let curPayment = createCurPayment();
    allPayments['payment1'] = curPayment;

    appendPaymentTable(curPayment);

    // Select the updated table data cells
    let curTdList = document.querySelectorAll('#paymentTable tbody tr td');

    // Expectations for the test case
    expect(curTdList.length).toEqual(4);
    expect(curTdList[0].innerText).toEqual('$100');
    expect(curTdList[1].innerText).toEqual('$20');
    expect(curTdList[2].innerText).toEqual('20%');
    expect(curTdList[3].innerText).toEqual('X');
  });

  it('should create a new payment on createCurPayment()', function () {
    // Test whether 'createCurPayment' correctly creates a new payment object
    let expectedPayment = {
      billAmt: '100',
      tipAmt: '20',
      tipPercent: 20,
    }

    // Expectations for the test case
    expect(createCurPayment()).toEqual(expectedPayment);
  });

  it('should not create payment with empty input on createCurPayment()', function () {
    // Test whether 'createCurPayment' returns undefined when called with empty input
    billAmtInput.value = '';
    tipAmtInput.value = '';
    let curPayment = createCurPayment();

    // Expectations for the test case
    expect(curPayment).toEqual(undefined);
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
    paymentId = 0;
    allPayments = {};
  });
});
