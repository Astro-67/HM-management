import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({ fullName, email, password }) {
  // 1. Sign up the user with email and password
  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: "",
      },
    },
  });

  if (signUpError) throw new Error(signUpError.message);
  
  return { user };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  
  const { data, error } = await supabase.auth.getUser();
  
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, avatar }) {
  let updateData = {};
  
  if (fullName) updateData.data = { full_name: fullName };
  
  const { data, error } = await supabase.auth.updateUser(updateData);
  
  if (error) throw new Error(error.message);
  
  if (!avatar) return data;
  
  // Upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
    
  if (storageError) throw new Error(storageError.message);
  
  // Get public URL for the uploaded avatar
  const { data: publicUrlData } = await supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);
  
  // Update user with the avatar URL
  const { data: updatedUser, error: urlError } = await supabase.auth.updateUser({
    data: {
      avatar: publicUrlData.publicUrl,
    },
  });
  
  if (urlError) throw new Error(urlError.message);
  
  return updatedUser;
}

export async function updatePassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  
  if (error) throw new Error(error.message);
  
  return data;
}
