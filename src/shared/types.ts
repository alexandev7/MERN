export interface ImageSearchApiResponse {
    results: ImageItem[];
    total?: number;
    total_pages?: number;
}

export interface ImageItem {
    alt_description: string;
    created_at: string;
    urls: Links;
    id: string;
}
export interface Links {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface ILikedImage {
    imageId:string;
}

export type User = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    isBeingRegistered: boolean;
}
