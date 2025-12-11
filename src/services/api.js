import { supabase } from './supabaseClient';

// --- API Functions ---

// --- User Management Functions ---
// These functions will interact with Supabase Auth and a 'profiles' table for user roles/metadata
// For client-side anon key, directly fetching/managing all users is typically restricted.
// This often requires RLS, a 'service_role' key (server-side), or custom Edge Functions.

export const getMockUsers = async () => {
  const { data, error } = await supabase
    .from('profiles') // Assuming a 'profiles' table linked to auth.users
    .select('id, username, email, role, is_active');
  if (error) throw error;
  // Map Supabase column names to existing app structure
  return data.map(profile => ({
    id: profile.id,
    username: profile.username,
    email: profile.email,
    role: profile.role,
    isActive: profile.is_active,
  }));
};

export const createMockUser = async (userData) => {
  // This will be handled by registerUser for new sign-ups
  // For admin-created users, it would involve both auth.signUp and inserting into profiles
  throw new Error('User creation should go through registerUser or admin panel with service_role key');
};

export const updateMockUser = async (id, updatedData) => {
  const { data: authUser, error: authError } = await supabase.auth.admin.updateUserById(id, {
    email: updatedData.email,
    password: updatedData.password // Only if password is provided
  });
  if (authError) throw authError;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .update({
      username: updatedData.username,
      role: updatedData.role,
      is_active: updatedData.isActive,
      // You might need to add email here too if you update it directly in auth.users
    })
    .eq('id', id)
    .single();
  if (profileError) throw profileError;

  return { ...profile, email: authUser.email };
};


export const deleteMockUser = async (id) => {
  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) throw error;
  // Also delete from profiles table if separate
  await supabase.from('profiles').delete().eq('id', id);
  return true;
};

// --- Building Management Functions ---

export const getBuildings = async () => {
  const { data, error } = await supabase
    .from('buildings')
    .select('*, floors(*), risers(*), images(*), tech_pdfs(*)'); // Adjusted to new table names for relations
  if (error) throw error;
  // Map Supabase data to fit existing app structure if needed
  return data.map(building => ({
    id: building.id,
    name: building.name,
    address: building.address,
    technologySummary: building.technology_summary,
    complexityPercentage: building.complexity_percentage,
    requiredTechnicians: building.required_technicians,
    parkingType: building.parking_type,
    parkingInstructions: building.parking_instructions,
    floors: building.floors,
    risers: building.risers,
    images: building.images,
    techPDFs: building.tech_pdfs,
  }));
};

export const getBuildingById = async (id) => {
  const { data, error } = await supabase
    .from('buildings')
    .select('*, floors(*), risers(*), images(*), tech_pdfs(*)') // Adjusted to new table names for relations
    .eq('id', id)
    .single();
  if (error) throw error;
  if (!data) throw new Error('Building not found');

  // Map Supabase data to fit existing app structure if needed
  return {
    id: data.id,
    name: data.name,
    address: data.address,
    technologySummary: data.technology_summary,
    complexityPercentage: data.complexity_percentage,
    requiredTechnicians: data.required_technicians,
    parkingType: data.parking_type,
    parkingInstructions: data.parking_instructions,
    floors: data.floors,
    risers: data.risers,
    images: data.images,
    techPDFs: data.tech_pdfs,
  };
};

export const createBuilding = async (buildingData) => {
  const { data, error } = await supabase
    .from('buildings')
    .insert([{
      name: buildingData.name,
      address: buildingData.address,
      technology_summary: buildingData.technologySummary,
      complexity_percentage: buildingData.complexityPercentage,
      required_technicians: buildingData.requiredTechnicians,
      parking_type: buildingData.parkingType,
      parking_instructions: buildingData.parkingInstructions,
      // Floors, risers, images, pdfs would be inserted into their respective tables
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateBuilding = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('buildings')
    .update({
      name: updatedData.name,
      address: updatedData.address,
      technology_summary: updatedData.technologySummary,
      complexity_percentage: updatedData.complexityPercentage,
      required_technicians: updatedData.requiredTechnicians,
      parking_type: updatedData.parkingType,
      parking_instructions: updatedData.parkingInstructions,
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteBuilding = async (id) => {
  const { error } = await supabase
    .from('buildings')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// --- Image Management Functions ---
export const addImageToBuilding = async (buildingId, image) => {
  const { data, error } = await supabase
    .from('images')
    .insert([{
      building_id: buildingId,
      type: image.type,
      url: image.url,
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const removeImageFromBuilding = async (imageId) => {
  const { error } = await supabase
    .from('images')
    .delete()
    .eq('id', imageId);
  if (error) throw error;
  return true;
};

// --- Floor/Riser Management Functions ---
export const addFloorToBuilding = async (buildingId, floor) => {
  const { data, error } = await supabase
    .from('floors')
    .insert([{
      building_id: buildingId,
      number: floor.number,
      description: floor.description,
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const removeFloorFromBuilding = async (floorId) => {
  const { error } = await supabase
    .from('floors')
    .delete()
    .eq('id', floorId);
  if (error) throw error;
  return true;
};

export const addRiserToBuilding = async (buildingId, riser) => {
  const { data, error } = await supabase
    .from('risers')
    .insert([{
      building_id: buildingId,
      number: riser.number,
      floors_covered: riser.floorsCovered,
      location_description: riser.locationDescription,
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const removeRiserFromBuilding = async (riserId) => {
  const { error } = await supabase
    .from('risers')
    .delete()
    .eq('id', riserId);
  if (error) throw error;
  return true;
};

// --- PDF Management Functions ---
export const addPdfToBuilding = async (buildingId, pdf) => {
  const { data, error } = await supabase
    .from('tech_pdfs')
    .insert([{
      building_id: buildingId,
      title: pdf.title,
      tech: pdf.tech,
      url: pdf.url,
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const removePdfFromBuilding = async (pdfId) => {
  const { error } = await supabase
    .from('tech_pdfs')
    .delete()
    .eq('id', pdfId);
  if (error) throw error;
  return true;
};


// --- Authentication Functions ---
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  // Fetch user profile from your 'profiles' table to get role and other metadata
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username, role, is_active')
    .eq('id', data.user.id)
    .single();
  if (profileError) throw new Error(profileError.message);

  if (!profile.is_active) {
    await supabase.auth.signOut(); // Log out inactive user
    throw new Error('User account is inactive.');
  }

  return {
    id: data.user.id,
    email: data.user.email,
    username: profile.username,
    role: profile.role,
    isActive: profile.is_active,
  };
};

export const registerUser = async (newUserData) => {
  const { data, error } = await supabase.auth.signUp({
    email: newUserData.email,
    password: newUserData.password,
    options: {
      data: {
        username: newUserData.username,
        role: newUserData.role,
      }
    }
  });
  if (error) throw new Error(error.message);

  // Return the full data object which includes user and session if email confirmation is off.
  return data;
};// --- Function to find nearest risers based on current floor ---
// This function operates on building data already fetched from Supabase
export const findNearestRisers = (building, currentFloor) => {
  const parseFloorsCovered = (floorsStr) => {
    const ranges = floorsStr.split(',');
    const floors = [];
    ranges.forEach(range => {
      if (range.includes('-')) {
        const [start, end] = range.trim().split('-').map(Number);
        for (let i = start; i <= end; i++) {
          floors.push(i);
        }
      } else {
        floors.push(parseInt(range.trim()));
      }
    });
    return floors;
  };

  const risersWithFloors = building.risers.map(riser => {
    const floors = parseFloorsCovered(riser.floorsCovered);
    return {
      ...riser,
      floorsCoveredArray: floors,
      minFloor: Math.min(...floors),
      maxFloor: Math.max(...floors)
    };
  });

  const above = risersWithFloors
    .filter(r => r.minFloor > currentFloor)
    .sort((a, b) => a.minFloor - b.minFloor)[0] || null;

  const below = risersWithFloors
    .filter(r => r.maxFloor < currentFloor)
    .sort((a, b) => b.maxFloor - a.maxFloor)[0] || null;

  return { above, below };
};