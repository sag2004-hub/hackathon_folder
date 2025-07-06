module myDev_addr::nice_token {
    use std::signer;
    use std::option::{Self, Option};
    use std::string;
    use aptos_framework::coin;

    /// Error codes
    const E_NOT_ADMIN: u64 = 100;
    const E_USER_NOT_REGISTERED: u64 = 101;
    const E_INVALID_USER_TYPE: u64 = 102;
    const E_INVALID_TIER: u64 = 103;
    const E_USER_ALREADY_REGISTERED: u64 = 104;

    /// Define the NICE token type.
    struct NICE has store, copy, drop {}

    /// Holds the capability to mint NICE coins.
    struct MintCap has key {
        cap: coin::MintCapability<NICE>
    }

    /// Store user info: type (viewer/broadcaster) and optional broadcaster tier.
    struct UserInfo has key {
        user_type: u8, // 0 = viewer, 1 = broadcaster
        broadcaster_tier: Option<u8> // 1 = top tier, 2 = mid tier, 3 = low tier
    }

    /// Initialize the NICE token. Called once by admin.
    fun init_module(admin: &signer) {
        assert!(signer::address_of(admin) == @myDev_addr, E_NOT_ADMIN);

        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<NICE>(
            admin,
            string::utf8(b"NICE"),
            string::utf8(b"NICE Coin"),
            6,
            true
        );

        // Store the mint capability
        move_to(admin, MintCap { cap: mint_cap });

        // Destroy burn and freeze capabilities since we don't need them
        coin::destroy_burn_cap(burn_cap);
        coin::destroy_freeze_cap(freeze_cap);
    }

    /// Register a user (viewer or broadcaster), mint bonus for new broadcasters.
    public entry fun connect_wallet(account: &signer, user_type: u8, tier: Option<u8>) acquires MintCap {
        let addr = signer::address_of(account);

        // Validate user type
        assert!(user_type == 0 || user_type == 1, E_INVALID_USER_TYPE);

        // Validate tier if provided
        if (option::is_some(&tier)) {
            let t = *option::borrow(&tier);
            assert!(t >= 1 && t <= 3, E_INVALID_TIER);
        };

        // Check if user is already registered
        assert!(!exists<UserInfo>(addr), E_USER_ALREADY_REGISTERED);

        // Register for coin if not already registered
        if (!coin::is_account_registered<NICE>(addr)) {
            coin::register<NICE>(account);
        };

        // Create user info
        move_to(account, UserInfo { user_type, broadcaster_tier: tier });

        // Mint bonus for new broadcasters
        if (user_type == 1 && option::is_some(&tier)) {
            let t = *option::borrow(&tier);
            let bonus_amount = if (t == 1) {
                2_000_000 // Top tier: 2 NICE tokens
            } else if (t == 2) {
                1_000_000 // Mid tier: 1 NICE token
            } else if (t == 3) {
                500_000   // Low tier: 0.5 NICE tokens
            } else {
                0
            };

            if (bonus_amount > 0) {
                let cap_struct = borrow_global<MintCap>(@myDev_addr);
                let coins = coin::mint<NICE>(bonus_amount, &cap_struct.cap);
                coin::deposit<NICE>(addr, coins);
            }
        }
    }

    /// Admin function to reward any user with a specific amount of NICE.
    public entry fun reward_user(admin: &signer, recipient: address, amount: u64) acquires MintCap {
        assert!(signer::address_of(admin) == @myDev_addr, E_NOT_ADMIN);

        let cap_struct = borrow_global<MintCap>(@myDev_addr);
        let coins = coin::mint<NICE>(amount, &cap_struct.cap);
        coin::deposit<NICE>(recipient, coins);
    }

    /// User-initiated token transfer.
    public entry fun transfer(sender: &signer, to: address, amount: u64) {
        coin::transfer<NICE>(sender, to, amount);
    }

    /// Public helper: check if user is registered.
    public fun is_registered(addr: address): bool {
        exists<UserInfo>(addr)
    }

    /// Public helper: get user info.
    public fun get_user_info(addr: address): (u8, Option<u8>) acquires UserInfo {
        assert!(exists<UserInfo>(addr), E_USER_NOT_REGISTERED);
        let user_info = borrow_global<UserInfo>(addr);
        (user_info.user_type, user_info.broadcaster_tier)
    }

    /// Public helper: get user balance.
    public fun get_balance(addr: address): u64 {
        coin::balance<NICE>(addr)
    }

    /// Public helper: check if account is registered for NICE coin.
    public fun is_coin_registered(addr: address): bool {
        coin::is_account_registered<NICE>(addr)
    }

    /// Admin function to update user tier (for existing broadcasters).
    public entry fun update_broadcaster_tier(admin: &signer, user_addr: address, new_tier: u8) acquires UserInfo {
        assert!(signer::address_of(admin) == @myDev_addr, E_NOT_ADMIN);
        assert!(exists<UserInfo>(user_addr), E_USER_NOT_REGISTERED);
        assert!(new_tier >= 1 && new_tier <= 3, E_INVALID_TIER);

        let user_info = borrow_global_mut<UserInfo>(user_addr);
        assert!(user_info.user_type == 1, E_INVALID_USER_TYPE);
        
        user_info.broadcaster_tier = option::some(new_tier);
    }

    #[view]
    /// View function to get coin info.
    public fun get_coin_info(): (string::String, string::String, u8) {
        (string::utf8(b"NICE"), string::utf8(b"NICE Coin"), 6)
    }
}