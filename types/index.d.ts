//custom types & interfaces

interface Album {
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