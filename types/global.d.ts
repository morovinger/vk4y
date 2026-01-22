// types/global.d.ts

// VK OpenAPI Type Declarations
interface VKAuthSession {
    mid: string;
    sid: string;
    secret: string;
    sig: string;
    expire: number;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        photo: string;
        photo_rec: string;
        href: string;
    };
}

interface VKAuthResponse {
    session: VKAuthSession | null;
    status: 'connected' | 'not_authorized' | 'unknown';
}

interface VKApiCallback<T = unknown> {
    (response: { response?: T; error?: VKApiError }): void;
}

interface VKApiError {
    error_code: number;
    error_msg: string;
    request_params?: Array<{ key: string; value: string }>;
}

interface VKApi {
    call<T = unknown>(method: string, params: Record<string, unknown>, callback: VKApiCallback<T>): void;
}

interface VKAuth {
    login(callback: (response: VKAuthResponse) => void, permissions?: number): void;
    logout(callback: () => void): void;
    getLoginStatus(callback: (response: VKAuthResponse) => void): void;
    getSession(): VKAuthSession | null;
}

interface VKOpenAPI {
    init(options: { apiId: string | number }): void;
    Api: VKApi;
    Auth: VKAuth;
}

declare const VK: VKOpenAPI;

declare global {
    interface Window {
        VK: VKOpenAPI;
    }
}

export interface AlbumPrivacySettings {
    category: number;
    owners?: {
        allowed?: number[];
        excluded?: number[];
    };
}

export interface Album {
    id: number;
    thumb_id: number;
    owner_id: number;
    title: string;
    description: string;
    created: number; // Unix timestamp
    updated: number; // Unix timestamp
    size: number;
    can_upload: boolean;
    privacy_view?: AlbumPrivacySettings;
    privacy_comment?: AlbumPrivacySettings;
    upload_by_admins_only?: boolean;
    comments_disabled?: boolean;
    thumb_src?: string;
}

export interface Photo {
    id: number;
    album_id: number;
    owner_id: number;
    sizes: PhotoSize[];
    text: string;
    date: number;
    width?: number;
    height?: number;
    tags?: PhotoTag[];
}

export interface PhotoSize {
    type: string;
    url: string;
    width: number;
    height: number;
}

export interface VkApiResponse<T> {
    response?: T;
    error?: {
        error_code: number;
        error_msg: string;
    };
}

export interface PhotoLikes {
    count: number;
    users: number[];
}

export interface PhotoComment {
    id: number;
    from_id: number;
    date: string;
    text: string;
    likes: { count: number };
}

export interface PhotoTag {
    user_id: number;
    tagged_name: string;
    x: number;
    y: number;
    x2: number;
    y2: number;
}

export interface PhotoMetadata {
    photo_id: string | number;
    owner_id: string | number;
    date: string;
    text: string;
    likes: PhotoLikes;
    comments: {
        count: number;
        items: PhotoComment[];
    };
    tags: PhotoTag[];
    album_id?: number;
    width?: number;
    height?: number;
    sizes?: PhotoSize[];
    error?: string;
}