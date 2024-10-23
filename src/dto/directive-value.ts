export enum DirectiveValue {
    NONE = 'none',
    SELF = 'self',
    UNSAFE_INLINE = 'unsafe-inline',
    UNSAFE_EVAL = 'unsafe-eval',
    STRICT_DYNAMIC = 'strict-dynamic',
    DATA = 'data:',
    BLOB = 'blob:',
    WORKER = 'worker-src',
    NONE_SRC = 'none src',
    SELF_SRC = 'self src',
    UNSAFE_INLINE_SRC = 'unsafe-inline src',
    UNSAFE_EVAL_SRC = 'unsafe-eval src',
    HTTPS_DOMAIN = 'https://',
    HTTP_DOMAIN = 'http://',
    ANY = '*',
    NONCE = 'nonce-',
    HASH = 'hash-',
    ALLOW_SAME_ORIGIN = 'allow-same-origin',
    ALLOW_SAME_SCRIPT = 'allow-scripts',
    SCRIPT = 'script',
    UPGRADE= 'upgrade-insecure-requests'

}