;"use strict";
(function(){
	var numbersBtn = document.querySelectorAll('.number'),
		 operationBtns = document.querySelectorAll('.operation'),
		 decimalBtn = document.getElementById('decimal'),
		 clearBtns = document.querySelectorAll('.clear_btn'),
		 backspaceBtn = document.getElementById('backspace'),
		 display = document.getElementById('display'),
		 plusMinusBtn = document.getElementById('plus_minus'),
		 sqrBtn = document.getElementById('sqr'),
		 sqrtBtn = document.getElementById('sqrt'),
		 sinBtn = document.getElementById('sin'),
		 cosBtn = document.getElementById('cos'),
		 tanBtn = document.getElementById('tan'),
		 memoryBtns = document.querySelectorAll('.memory'),
		 MemoryCurrentNumber = 0,
		 PressOperation = false,
		 MrMemory = 0,
		 MemoryPendingOperation = '';

	for (var i = 0; i < numbersBtn.length; i++) {
		var number = numbersBtn[i];

		number.addEventListener('click', function(e){
			numberPress(e.target.textContent);
		});
	};

	for (var i = 0; i < operationBtns.length; i++) {
		var operationBtn = operationBtns[i];

		operationBtn.addEventListener('click', function(e){
			operation(e.target.textContent);
		});
	};

	decimalBtn.addEventListener('click', decimal);

	for (var i = 0; i < clearBtns.length; i++) {
		var clearBtn = clearBtns[i];

		clearBtn.addEventListener('click', function(e) {
			clear(e.target.id);
		});
	};

	backspaceBtn.addEventListener('click', backspace);

	plusMinusBtn.addEventListener('click', plusMinus);

	sqrBtn.addEventListener('click', sqr);

	sqrtBtn.addEventListener('click', sqrt);

	sinBtn.addEventListener('click', sin);

	cosBtn.addEventListener('click', cos);

	tanBtn.addEventListener('click', tan);

	for (var i=0; i<memoryBtns.length; i++) {
		var memoryBtn = memoryBtns[i];

		memoryBtn.addEventListener('click', function(e){
			memory(e.target.id);
		});
	};

	function numberPress(num) {
		if (PressOperation) {
			if (display.value === '-' && num !== '0'){
				display.value = '-' + num;
			}
			else {
				display.value = num;
			}
			PressOperation = false;
		} 
		else {
			if (display.value === '0' || display.value === '-' && num === '0') {
			display.value = num;
			}
			else {
			display.value+= num;
			}
		};
		display.value = display.value.substring(0, 14);
	};

	function operation(symvol) {
		var localOperationMemory = display.value;

		if (PressOperation && MemoryPendingOperation !== '=' && MrMemory === '0'){
			display.value = MemoryCurrentNumber;
		} else {
			PressOperation = true;
			if (MemoryPendingOperation === '+') {
				MemoryCurrentNumber += parseFloat(localOperationMemory);
			}
			else if (MemoryPendingOperation === '-') {
				MemoryCurrentNumber -= parseFloat(localOperationMemory);
			}
			else if (MemoryPendingOperation === '*') {
				MemoryCurrentNumber *= parseFloat(localOperationMemory);
			}
			else if (MemoryPendingOperation === '/') {
				MemoryCurrentNumber /= parseFloat(localOperationMemory);
			}
			else if (MemoryPendingOperation === 'xy') {
				MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, parseFloat(localOperationMemory));
			}
			else {
				MemoryCurrentNumber = parseFloat(localOperationMemory);
			}
		display.value = MemoryCurrentNumber;
		MemoryPendingOperation = symvol;
		display.value = display.value.substring(0, 14);
		};
	};

	function decimal() {
		var localDecimalMemory = display.value;

		PressOperation = false;
		if (PressOperation) {
			localDecimalMemory = '0.';
		}
		if (localDecimalMemory === '-'){
				localDecimalMemory = '-0.';
			} else {
			if (localDecimalMemory.indexOf('.') === -1) {
				localDecimalMemory += '.';
			};
		};
		display.value = localDecimalMemory;
		display.value = display.value.substring(0, 14);
	};

	function clear(id) {
		if (id === 'ce') {
			display.value = 0;
			PressOperation = true;
		} else {
			display.value = 0;
			MemoryCurrentNumber = 0;
			MemoryPendingOperation = 0;
			MrMemory = 0;
		};
	};

	function backspace() {
		PressOperation = false;
		var str = display.value;

		if (str !== '0' && str.length>=2) {
		str = str.substring(0, str.length - 1);
		display.value = str;
		} else {
			if (str.length=1) {
				display.value = 0;
			}
		};
		PressOperation = true;
	};

	function plusMinus() {
		PressOperation = false;
		var localPlusMinusMemory = display.value;

		if (localPlusMinusMemory === '0') {
			localPlusMinusMemory = '-';
		} else if (localPlusMinusMemory === '-'){
			localPlusMinusMemory = '0';
		}
			else if (localPlusMinusMemory > '0'){
				localPlusMinusMemory = '-' + display.value;
			}
			else if(localPlusMinusMemory < '0') {
				localPlusMinusMemory = display.value.substring(1);
			}
		display.value = localPlusMinusMemory;
		display.value = display.value.substring(0, 15);
	};

	function sqr() {
		PressOperation = false;
		var localSqrMemory = display.value;

		localSqrMemory = localSqrMemory*localSqrMemory;
		display.value = localSqrMemory;
		display.value = display.value.substring(0, 14);
		PressOperation = true;
	};

	function sqrt() {
		PressOperation = false;
		var localSqrtMemory = display.value;

		localSqrtMemory = Math.sqrt(localSqrtMemory);
		display.value = localSqrtMemory;
		display.value = display.value.substring(0, 14);
		PressOperation = true;
	};

	function sin() {
		PressOperation = false;
		var localSinMemory = display.value;

		localSinMemory = parseFloat(Math.sin(localSinMemory*Math.PI/180).toFixed(12));
		display.value = localSinMemory;
		display.value = display.value.substring(0, 14);
		PressOperation = true;
	};

	function cos() {
		PressOperation = false;
		var localCosMemory = display.value;

		localCosMemory = parseFloat(Math.cos(localCosMemory*Math.PI/180).toFixed(12));
		display.value = localCosMemory;
		display.value = display.value.substring(0, 14);
		PressOperation = true;
	};

	function tan() {
		PressOperation = false;
		var localTanMemory = display.value;
		
		if (localTanMemory === '90'){
			display.value = 'infinity';
		} else {
		localTanMemory = parseFloat(Math.tan(localTanMemory*Math.PI/180).toFixed(12));
		display.value = localTanMemory;
		display.value = display.value.substring(0, 14);
		PressOperation = true;
		}
	};

	function memory(id) {
		PressOperation = false;
		var localMemory = display.value;

		if (id === 'ms'){
			localMemory = display.value;
			MrMemory = localMemory;
		} else if (id === 'mr'){
			display.value = MrMemory; 
		};
		PressOperation = true;
	};
})();