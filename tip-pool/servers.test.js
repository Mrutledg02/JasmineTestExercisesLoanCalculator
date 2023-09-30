describe("Servers test (with setup and tear-down)", function() {
    beforeEach(function () {
        //initialization logic
      serverNameInput.value = 'Alice';
    });
  
    it('should add a new server to allServers on submitServerInfo()', function () {
      submitServerInfo();

      //Check if a new server was added to allServers
      expect(Object.keys(allServers).length).toEqual(1);

      //Check if the serverName of the newly added server is correct
      expect(allServers['server' + serverId].serverName).toEqual('Alice');
    });
  
    it('should not add a new server on submitServerInfo() with empty input', function () {
      serverNameInput.value = '';
      submitServerInfo();

      //check if no server was added to allServers when input is empty
      expect(Object.keys(allServers).length).toEqual(0);
    });
  
    it('should update #servertable on updateServerTable()', function () {
      submitServerInfo();
      updateServerTable();
  
      let curTdList = document.querySelectorAll('#serverTable tbody tr td');
        
      //Check if the correct number of <td> elements was added.
      expect(curTdList.length).toEqual(3);

      //Check if the server name is displayed correctly.
      expect(curTdList[0].innerText).toEqual('Alice');

      //Check if the default top amount is displayed correctly.
      expect(curTdList[1].innerText).toEqual('$0.00');

      //Check if an 'X' buttons is displayed (if applicable)
      expect(curTdList[2].innerText).toEqual('X');
    });
  
    afterEach(function() {
      serverId = 0;
      serverTbody.innerHTML = '';
      allServers = {};
    });
  });