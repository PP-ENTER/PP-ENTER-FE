# PP-ENTER-FE
소셜 미디어 웹 서비스 프론트엔드 Repo

erDiagram
    CustomUser {
        int id PK
        string username
        string email
        string password
        datetime updated_at
    }

    Profile {
        int user_id PK FK
        string nickname
        string profile_image
        string first_name
        string last_name
        datetime updated_at
    }

    FaceChat {
        int id PK
        string room_name
        int host_id FK
        int status
        datetime duration
        int count
        datetime created_at
        datetime updated_at
    }

    FaceChatParticipant {
        int id PK
        int face_chat_id FK
        int seqno
        int user_id FK
        datetime joined_at
    }

    FaceChatTag {
        int id PK
        int face_chat_id FK
        int tag_id FK
    }

    Tag {
        int id PK
        string name
    }

    Friend {
        int id PK
        int user_id FK
        int friend_id FK
        datetime created_at
    }

    FriendRequest {
        int id PK
        int from_user_id FK
        int to_user_id FK
        boolean status
        datetime created_at
    }

    CustomUser ||--|| Profile : "1:1"
    CustomUser ||--o{ FaceChat : "1:N"
    CustomUser ||--o{ FaceChatParticipant : "1:N"
    CustomUser ||--o{ Friend : "N:N"
    CustomUser ||--o{ FriendRequest : "1:N (sent)"
    CustomUser ||--o{ FriendRequest : "1:N (received)"

    FaceChat ||--o{ FaceChatParticipant : "1:N"
    FaceChat ||--o{ FaceChatTag : "1:N"

    Tag ||--o{ FaceChatTag : "1:N"
