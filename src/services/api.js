<<<<<<< HEAD
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
=======
// src/services/api.js

// This would connect to your backend API in production
// For now, we'll simulate data with local arrays

// Mock Data
let mockBuildings = [
  {
    id: 'b1',
    name: '38 Bidwell St.',
    address: 'Toronto, ON',
    technologySummary: 'Huawei, U2000',
    complexityPercentage: 30,
    requiredTechnicians: 1,
    parkingType: 'Underground',
    parkingInstructions: 'Park P1, Visitor, register plate.',
    floors: [
      { id: 'f1', number: 1, description: 'Ground floor' },
      { id: 'f2', number: 25, description: '25th Floor' }
    ],
    risers: [
      { id: 'r1', number: 'Riser 1', floorsCovered: '1-10', locationDescription: 'Electrical room near elevator' },
      { id: 'r2', number: 'Riser 2', floorsCovered: '11-20', locationDescription: 'Basement B2' },
      { id: 'r3', number: 'Riser 3', floorsCovered: '21-30', locationDescription: 'Roof access' }
    ],
    images: [
      { id: 'i1', type: 'Parking', url: 'https://via.placeholder.com/300?text=Parking+Photo' },
      { id: 'i2', type: 'Entrance', url: 'https://via.placeholder.com/300?text=Entrance+Photo' }
    ],
    techPDFs: [
      { id: 'p1', title: 'Huawei ONT Config Guide – MA5800/U2000', tech: 'Huawei', url: '/pdfs/huawei.pdf' },
      { id: 'p2', title: 'U2000 Setup Manual', tech: 'U2000', url: '/pdfs/u2000.pdf' }
    ]
  },
  {
    id: 'b2',
    name: '7 Lorraine Dr.',
    address: 'Toronto, ON',
    technologySummary: 'Nokia, SmartOLT',
    complexityPercentage: 80,
    requiredTechnicians: 2,
    parkingType: 'Street',
    parkingInstructions: 'Metered parking only. Register plate at front desk.',
    floors: [
      { id: 'f3', number: 1, description: 'Ground floor' },
      { id: 'f4', number: 25, description: '25th Floor' }
    ],
    risers: [
      { id: 'r4', number: 'Riser 2', floorsCovered: '1-15', locationDescription: 'Main lobby closet' },
      { id: 'r5', number: 'Riser 3', floorsCovered: '16-30', locationDescription: 'Penthouse mechanical room' }
    ],
    images: [
      { id: 'i3', type: 'Parking', url: 'https://via.placeholder.com/300?text=Lorraine+Parking' }
    ],
    techPDFs: [
      { id: 'p3', title: 'Nokia ONT Config Guide – 7 Lorraine', tech: 'Nokia', url: '/pdfs/nokia.pdf' },
      { id: 'p4', title: 'SmartOLT Provisioning – Tower A', tech: 'SmartOLT', url: '/pdfs/smartolt.pdf' }
    ]
  },
  {
    id: 'b3',
    name: '159 Dundas E',
    address: 'Toronto, ON',
    technologySummary: 'Positron',
    complexityPercentage: 50,
    requiredTechnicians: 2,
    parkingType: 'Outdoor',
    parkingInstructions: 'Free lot behind building. No registration needed.',
    floors: [
      { id: 'f5', number: 1, description: 'Ground floor' },
      { id: 'f6', number: 12, description: '12th Floor' }
    ],
    risers: [
      { id: 'r6', number: 'Riser 1', floorsCovered: '1-10', locationDescription: 'Service entrance' },
      { id: 'r7', number: 'Riser 2', floorsCovered: '11-20', locationDescription: 'Back alley utility shed' }
    ],
    images: [],
    techPDFs: [
      { id: 'p5', title: 'Positron GAM Configuration', tech: 'Positron', url: '/pdfs/positron.pdf' }
    ]
  }
];

// Mock Users (for login and management)
let mockUsers = [
  { id: 'u1', username: 'admin', email: 'admin@example.com', passwordHash: 'admin123', role: 'Admin', isActive: true },
  { id: 'u2', username: 'tech1', email: 'tech1@example.com', passwordHash: 'tech123', role: 'Technician', isActive: true }
];

// --- API Functions ---

// --- User Management Functions (for ManageUsers page) ---
export const getMockUsers = () => {
  return [...mockUsers]; // Return a copy to prevent direct mutation
};

export const createMockUser = (userData) => {
  // Check if username or email already exists
  const existingUser = mockUsers.find(u => u.username === userData.username || u.email === userData.email);
  if (existingUser) {
    throw new Error('Username or email already exists');
  }

  const newUser = {
    id: `u${mockUsers.length + 1}`, // Simple ID generation
    ...userData,
    isActive: true // New users are active by default
  };
  mockUsers.push(newUser);
  return { ...newUser }; // Return a copy
};

export const updateMockUser = (id, updatedData) => {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    // Prevent changing the password unless explicitly provided in updatedData
    // If password is being updated, it should come as 'password' and be stored as 'passwordHash'
    if (updatedData.password) {
        mockUsers[index] = { ...mockUsers[index], ...updatedData, passwordHash: updatedData.password };
        // Remove the 'password' field from the returned object for security
        const { password, ...userWithoutPassword } = mockUsers[index];
        return { ...userWithoutPassword };
    } else {
        // If password is not being updated, just spread the other data
        mockUsers[index] = { ...mockUsers[index], ...updatedData };
        // Return the updated user object without the passwordHash for security
        const { passwordHash, ...userWithoutPassword } = mockUsers[index];
        return { ...userWithoutPassword };
    }
  }
  return null;
};

export const deleteMockUser = (id) => {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    // Prevent deletion of the main admin user for safety (optional)
    if (mockUsers[index].id === 'u1') {
        throw new Error('Cannot delete the main admin user.');
    }
    mockUsers.splice(index, 1);
    return true;
  }
  return false;
};

// --- Building Management Functions (for ManageBuildings page and BuildingList page) ---
// This is the crucial function that was missing or not exported correctly
export const getBuildings = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("getBuildings: Returning mock ", mockBuildings); // Debug log
  return [...mockBuildings]; // Return a copy to prevent direct mutation
};

export const getBuildingById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockBuildings.find(b => b.id === id);
};

export const createBuilding = (buildingData) => {
  const newBuilding = { ...buildingData, id: `b${mockBuildings.length + 1}`, floors: [], risers: [], images: [], techPDFs: [] };
  mockBuildings.push(newBuilding);
  return { ...newBuilding }; // Return a copy
};

export const updateBuilding = (id, updatedData) => {
  const index = mockBuildings.findIndex(b => b.id === id);
  if (index !== -1) {
    mockBuildings[index] = { ...mockBuildings[index], ...updatedData };
    return { ...mockBuildings[index] }; // Return a copy
  }
  return null;
};

export const deleteBuilding = (id) => {
  const index = mockBuildings.findIndex(b => b.id === id);
  if (index !== -1) {
    mockBuildings.splice(index, 1);
    return true;
  }
  return false;
};

// --- Floor/Riser Management Functions (for ManageFloorsRisers page) ---
// These are handled directly within the ManageFloorsRisers component by updating the mockBuildings array

// --- Image Management Functions (for ManageImages page) ---
// These are handled directly within the ManageImages component by updating the mockBuildings array

// --- PDF Management Functions (for ManagePDFs page) ---
// These are handled directly within the ManagePDFs component by updating the mockBuildings array

// --- Login Function ---
export const login = async (username, password) => {
  console.log("Attempting login for username:", username); // Debug log
  console.log("Available users:", mockUsers); // Debug log

  // Find user by username and match passwordHash
  const user = mockUsers.find(u => u.username === username && u.passwordHash === password);
  console.log("Found user:", user); // Debug log

  if (!user || !user.isActive) {
    throw new Error('Invalid credentials');
  }
  // Simulate a successful login response
  // Return a copy of the user object without the passwordHash for security
  const { passwordHash, ...userForReturn } = user;
  return { ...userForReturn };
};

// --- Registration Function ---
export const registerUser = async (newUserData) => {
  // Check if username or email already exists
  const existingUser = mockUsers.find(u => u.username === newUserData.username || u.email === newUserData.email);
  if (existingUser) {
    throw new Error('Username or email already exists');
  }

  // Create new user object
  const newUser = {
    id: `u${mockUsers.length + 1}`, // Simple ID generation
    ...newUserData,
    isActive: true // New users are active by default
  };

  // Add user to the mock array
  mockUsers.push(newUser);

  // Return the created user (excluding passwordHash)
  const { passwordHash, ...userForReturn } = newUser;
  return { ...userForReturn };
};

// --- Function to find nearest risers based on current floor ---
export const findNearestRisers = (building, currentFloor) => {
  // Parse floors covered string (e.g., "1-10,12" -> [1, 2, ... 10, 12])
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
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

<<<<<<< HEAD
=======
  // Map risers to include their parsed floor list and min/max
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
  const risersWithFloors = building.risers.map(riser => {
    const floors = parseFloorsCovered(riser.floorsCovered);
    return {
      ...riser,
      floorsCoveredArray: floors,
      minFloor: Math.min(...floors),
      maxFloor: Math.max(...floors)
    };
  });

<<<<<<< HEAD
=======
  // Find risers above and below current floor
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
  const above = risersWithFloors
    .filter(r => r.minFloor > currentFloor)
    .sort((a, b) => a.minFloor - b.minFloor)[0] || null;

  const below = risersWithFloors
    .filter(r => r.maxFloor < currentFloor)
    .sort((a, b) => b.maxFloor - a.maxFloor)[0] || null;

  return { above, below };
};