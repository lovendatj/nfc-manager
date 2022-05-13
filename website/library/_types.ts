export interface HasChildren {
    children?: React.ReactNode[];
}

export interface HasStyle {
    style?: React.CSSProperties;
}

export interface HasStyleMap {
    [key: string]: React.CSSProperties;
}