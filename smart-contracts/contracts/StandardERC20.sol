// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     * 
     * @param owner address of owner
     * @param spender address of spender
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     * 
     * @param spender address of the spender
     * @param amount amount of tokens to be approved to the spender
     * 
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract StandardERC20 is IERC20 {
    // state variables
    mapping (address => uint256) private _balances;
    
    mapping (address => mapping (address => uint256)) private _allowances;
    
    uint256 private _totalSupply;
    
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    
    constructor (string memory name_, string memory symbol_, uint256 totalSupply_)  {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18; // 1 ether  = 10^18 wei
        _totalSupply = totalSupply_;
        _balances[address(this)] = _balances[address(this)] + totalSupply_;
        emit Transfer(address(0),msg.sender,_totalSupply);
    }
    
    /// @notice Function to get the name of the Token
    /// @dev returns the name of the token
    /// @return name of the Token
    function name() public view returns (string memory) {
        return _name;
    }
    
    /// @notice Function to get the Symbol of the Token
    /// @dev returns the Symbol of the token
    /// @return symbol of the Token
    function symbol() public view  returns (string memory){
        return _symbol;
    }
    
    /// @notice Function to get the decimals of the Token
    /// @dev returns the decimals of the token
    /// @return decimals of the Token
    function decimals() public view returns(uint8) {
        return _decimals;
    }
    
    /// @notice Function to get total supply of the Token
    /// @dev returns the total supply of the token
    /// @return totalSupply of the Token
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
    

    /// @notice Function to get balance of the Token holder
    /// @dev returns the balance amount of the token holder
    /// @param account address of the account
    /// @return balance amount in an account
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    
    /// @notice Function to transfer a specified amount to another address
    /// @dev Function to transfer a specified amount to another address
    /// @param recipient address of the recipient
    /// @param amount amount of tokens to be transferred
    /// @return boolean status of transfer; true if transfer succeeds and false if not
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, recipient,amount );
        return true;
    }
    
    /// @notice Function to approve another account to transfer from the callers account
    /// @dev Function to approve another account to transfer from the callers account
    /// @param spender address of the spender
    /// @param amount amount of tokens to be approved to the spender
    /// @return boolean status of approval; true if transfer succeeds and false if not
    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
    
    /// @notice Function to get the allowances of an approved acccount
    /// @dev gets the allowances of the approved acccount
    /// @param spender address of the spender
    /// @param owner address of the owner
    /// @return  the amount of tokens approved for the spender
    function allowance(address owner, address spender) public override view returns(uint256) {
        return _allowances[owner][spender];
    } 
    
    /// @notice Function to send certain amount of tokens from one account to another account
    /// @dev facilitates transfer between two accounts other than the caller.
    /// @param sender address of the sender
    /// @param recipient address of the recipient
    /// @param amount amount of tokens to be sent
    /// @return boolean status of transfer; true if transfer succeeds and false if not
    function transferFrom(address sender, address recipient, uint256 amount) public override returns(bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
        return true;
    }
    
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(recipient != address(0),"ERC20: transfer from zero transfer");
        require(sender != address(0),"ERC20: transfer from zero transfer");
        
        _balances[sender] = _balances[sender] - amount;
        _balances[recipient] = _balances[recipient] + amount;
        emit Transfer(sender, recipient, amount);
    }
    
    function _approve(address owner, address spender, uint256 amount) internal {
        require(spender != address(0),"ERC20: transfer from zero transfer");
        require(owner != address(0),"ERC20: transfer from zero transfer");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        _balances[account] = accountBalance - amount;
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}