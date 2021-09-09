export type UserData = {
  uid: string;
  username: string;
  bio: string;
  email: string;
  imageUrl: string;
  following: string[];
  followers: string[];
};

export type Following = {
  following: string[];
};

export type Followers = {
  followers: string[];
};

export type UpdateFollowData = {
  id: string;
  data: Followers | Following;
};
