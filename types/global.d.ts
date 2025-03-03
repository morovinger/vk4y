// types/global.d.ts

declare global {
    interface Window {
        VK: any;
    }
}

export interface AlbumPrivacySettings {
    // Define privacy settings structure here
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
    [key: string]: any;
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