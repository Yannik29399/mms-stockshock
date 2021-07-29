export interface ConfigModel {
    saturn: StoreConfiguration;
    mmde: StoreConfiguration;
    mmat: StoreConfiguration;
    mmes: StoreConfiguration;
}

export interface StoreConfiguration {
    // User data
    accounts: string[][];

    // Categories to check
    categories?: string[];
    category_regex: string;
    start_url?: string;

    // Misc config settings
    ignore_sleep?: boolean;
    min_sleep_time?: number;
    max_sleep_time?: number;
    cookies?: number;
    announce_cookies: boolean;
    shopping_cart_alerts: boolean;
    id_replacements?: string[][];

    // Discord channels for notifications
    discord_bot_token?: string;
    discord_channel?: string;
    stock_discord_channel?: string;
    stock_discord_regex_channel?: string[][];
    cookie_discord_channel?: string;
    admin_discord_channel?: string;

    discord_role_ping?: string;
    stock_discord_role_ping?: string;
    stock_discord_regex_role_ping?: string[][];
    cookie_discord_role_ping?: string;
    admin_discord_role_ping?: string;

    // Twitter notification settings
    twitter_api_key?: string;
    twitter_api_key_secret?: string;
    twitter_access_token?: string;
    twitter_access_token_secret?: string;
    twitter_tags?: string[];

    // Proxies
    proxy_url?: string;
    proxy_username?: string;
    proxy_password?: string;
    proxy_urls?: string[];

    // Cookie Jar
    dynamo_db_region?: string;
    dynamo_db_table_name?: string;
    dynamo_db_access_key?: string;
    dynamo_db_secret_access_key?: string;

    // WebSocket config
    use_websocket?: boolean;
    websocket_passwords?: string[];
    websocket_port?: number;
    websocket_https?: boolean;
    websocket_cert_path?: string;
    websocket_key_path?: string;

    // SHA256 hashes for queries
    loginSHA256: string;
    categorySHA256: string;
    wishlistSHA256: string;
    addProductSHA256: string;
    getProductSHA256: string;
}
