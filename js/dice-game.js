// Dice Game Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are fully loaded
    setTimeout(function() {
        // Initialize dice game
        initDiceGame();
        
        // Event listeners for dice controls
        setupDiceEventListeners();
        
        // Force display by removing any opacity: 0
        document.querySelectorAll('.dice-container, .card-container, .dice-game-container').forEach(function(el) {
            el.style.opacity = '1';
            el.style.display = 'block';
        });
    }, 100);
});

// Initialize dice game elements and visuals
function initDiceGame() {
    // Create dice spinner content
    createDiceSpinners();
    
    // Set initial values
    updateDiceUI();
    
    // Initial slider position
    updateDiceSlider();
    
    console.log('Dice game initialized');
}

// Create dice spinner elements
function createDiceSpinners() {
    const spinners = document.querySelectorAll('.dice-spinner-content');
    
    spinners.forEach((spinner) => {
        let content = '';
        for (let i = 0; i < 10; i++) {
            content += `<div class="dice-digit">${i}</div>`;
        }
        spinner.innerHTML = content;
    });
}

// Set up event listeners for dice controls
function setupDiceEventListeners() {
    // Amount controls
    document.getElementById('dice_amount_half').addEventListener('click', function() {
        const amountInput = document.getElementById('dice_amount');
        const currentAmount = parseFloat(amountInput.value) || 1;
        amountInput.value = (currentAmount / 2).toFixed(2);
        updateDiceUI();
    });
    
    document.getElementById('dice_amount_double').addEventListener('click', function() {
        const amountInput = document.getElementById('dice_amount');
        const currentAmount = parseFloat(amountInput.value) || 1;
        amountInput.value = (currentAmount * 2).toFixed(2);
        updateDiceUI();
    });
    
    document.getElementById('dice_amount_max').addEventListener('click', function() {
        const amountInput = document.getElementById('dice_amount');
        // In a real implementation, this would get max balance
        const maxAmount = 100; // Placeholder value
        amountInput.value = maxAmount.toFixed(2);
        updateDiceUI();
    });
    
    // Amount input change
    document.getElementById('dice_amount').addEventListener('input', function() {
        updateDiceUI();
    });
    
    // Win chance controls
    document.getElementById('dice_chanceslider').addEventListener('input', function() {
        const chanceInput = document.getElementById('dice_chance');
        chanceInput.value = parseFloat(this.value).toFixed(2);
        updateDiceUI();
    });
    
    document.getElementById('dice_chance').addEventListener('input', function() {
        const slider = document.getElementById('dice_chanceslider');
        const value = parseFloat(this.value);
        if (!isNaN(value) && value >= 0.01 && value <= 98) {
            slider.value = value;
            updateDiceUI();
        }
    });
    
    // Dice roll button
    document.getElementById('dice_bet').addEventListener('click', function() {
        rollDice();
    });
    
    // Dice mode (under/over)
    const modeButtons = document.querySelectorAll('#dice_mode a');
    modeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const mode = this.getAttribute('data-type');
            document.getElementById('dice_mode').setAttribute('data-mode', mode);
            updateDiceUI();
        });
    });
}

// Update all dice UI elements
function updateDiceUI() {
    const amount = parseFloat(document.getElementById('dice_amount').value) || 1;
    const chance = parseFloat(document.getElementById('dice_chance').value) || 50;
    const mode = document.getElementById('dice_mode').getAttribute('data-mode');
    
    // Calculate payout (simplified version)
    const houseEdge = 1; // Placeholder for house edge percentage
    const payout = ((100 - houseEdge) / chance).toFixed(2);
    
    // Calculate profit
    const profit = (amount * payout - amount).toFixed(2);
    
    // Update fields
    document.getElementById('dice_payout').value = payout;
    document.getElementById('dice_profit').value = profit;
    
    // Update roll button text
    const buttonText = mode === 'under' ? `ROLL UNDER ${chance.toFixed(2)}` : `ROLL OVER ${(100-chance).toFixed(2)}`;
    document.getElementById('dice_bet').textContent = buttonText;
    
    // Update dice target
    document.getElementById('dice_target').textContent = chance.toFixed(2);
    
    // Update dice range
    document.getElementById('dice_range').style.width = `${chance}%`;
    
    // Update slider if needed
    updateDiceSlider();
}

// Update dice slider based on input
function updateDiceSlider() {
    const slider = document.getElementById('dice_chanceslider');
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const percentage = ((val - min) / (max - min)) * 100;
    
    // Set background gradient for slider track
    slider.style.background = `linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) ${percentage}%, var(--bg-card) ${percentage}%, var(--bg-card) 100%)`;
    
    // Update chance input if needed
    document.getElementById('dice_chance').value = val.toFixed(2);
}

// Roll the dice animation and result
function rollDice() {
    // Disable controls during roll
    document.getElementById('dice_bet').disabled = true;
    document.getElementById('dice_amount').disabled = true;
    document.getElementById('dice_chance').disabled = true;
    document.getElementById('dice_chanceslider').disabled = true;
    
    // Hide previous cashout
    document.getElementById('dice_cashout').classList.add('hidden');
    
    // Start spinning animation
    const spinnerContainer = document.querySelector('.dice-spinner-container');
    spinnerContainer.classList.add('dice-spinning');
    
    // Generate random result between 0 and 100
    const result = Math.random() * 100;
    const resultFixed = result.toFixed(2);
    
    // Determine if win or loss
    const chance = parseFloat(document.getElementById('dice_chance').value);
    const mode = document.getElementById('dice_mode').getAttribute('data-mode');
    const isWin = (mode === 'under' && result < chance) || 
                  (mode === 'over' && result > (100 - chance));
    
    // Simulate server response delay
    setTimeout(() => {
        // Stop spinning animation
        spinnerContainer.classList.remove('dice-spinning');
        
        // Update result number
        document.getElementById('dice_number').textContent = resultFixed;
        
        // Update pointer position
        document.getElementById('dice_pointer').style.left = `${result}%`;
        
        // Set spinner values
        setDiceDigits(resultFixed);
        
        // Show win/loss
        const resultElement = document.getElementById('dice_result');
        resultElement.innerHTML = `<div class="text-3xl font-bold ${isWin ? 'text-win' : 'text-loss'}">${isWin ? 'WIN' : 'LOSS'}</div>
                                  <div class="text-sm text-secondary">Result</div>`;
        
        // Show cashout info
        const amount = parseFloat(document.getElementById('dice_amount').value);
        const payout = parseFloat(document.getElementById('dice_payout').value);
        const profit = isWin ? amount * (payout - 1) : -amount;
        
        document.getElementById('dice_cashout_number').textContent = resultFixed;
        document.getElementById('dice_cashout_profit').textContent = isWin ? `+${profit.toFixed(2)}` : profit.toFixed(2);
        document.getElementById('dice_cashout_profit').className = isWin ? 'text-success' : 'text-danger';
        document.getElementById('dice_cashout').classList.remove('hidden');
        
        // Add to history
        addToHistory({
            user: 'You',
            number: resultFixed,
            bet: amount.toFixed(2),
            payout: `${payout}×`,
            profit: isWin ? `+${profit.toFixed(2)}` : profit.toFixed(2),
            isWin: isWin
        });
        
        // Re-enable controls
        document.getElementById('dice_bet').disabled = false;
        document.getElementById('dice_amount').disabled = false;
        document.getElementById('dice_chance').disabled = false;
        document.getElementById('dice_chanceslider').disabled = false;
        
    }, 2000);
}

// Set dice spinner digits
function setDiceDigits(result) {
    // Convert result to string with padding if needed
    const resultStr = result.toString().padStart(5, '0');
    
    // Set each spinner
    const spinners = document.querySelectorAll('.dice-spinner');
    
    for (let i = 0; i < Math.min(spinners.length, resultStr.length); i++) {
        const digit = parseInt(resultStr[i]);
        const spinner = spinners[i];
        const content = spinner.querySelector('.dice-spinner-content');
        
        // Calculate offset for the digit (each digit is 100% height)
        const offset = -digit * 100;
        content.style.transform = `translateY(${offset}%)`;
    }
}

// Add roll to history
function addToHistory(data) {
    const history = document.getElementById('dice_history');
    
    // Create new row
    const row = document.createElement('tr');
    row.className = 'border-b border-card';
    
    // Add cells
    row.innerHTML = `
        <td>${data.user}</td>
        <td>${data.number}</td>
        <td>${data.bet}</td>
        <td>${data.payout}</td>
        <td class="${data.isWin ? 'text-success' : 'text-danger'}">${data.profit}</td>
    `;
    
    // Add to top
    if (history.firstChild) {
        history.insertBefore(row, history.firstChild);
    } else {
        history.appendChild(row);
    }
    
    // Limit history to 10 entries
    while (history.children.length > 10) {
        history.removeChild(history.lastChild);
    }
}