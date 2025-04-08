import React, { useState, useEffect } from 'react';
import { Home, Bed, RefreshCw, Info, Settings, LogIn, LogOut, Edit, User, Shield, EyeOff, Eye, UserPlus, Users, PieChart, Clock, ArrowRight, Plus, Trash2, ChevronLeft, Building } from 'lucide-react';

const RecoveryHousingApp = () => {
  // State management
  const [userType, setUserType] = useState(null); // null (not logged in), 'viewer', 'operator', or 'admin'
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showLogin, setShowLogin] = useState(true); // Default to showing login screen
  const [loginForm, setLoginForm] = useState({ username: '', password: '', role: 'viewer' });
  const [loginError, setLoginError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [operators, setOperators] = useState([]);
  const [newOperator, setNewOperator] = useState({ username: '', password: '', assignedHouses: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState('homes'); // 'homes', 'operators', 'analytics', 'addHome'
  const [newHome, setNewHome] = useState({
    name: '',
    address: '',
    phone: '',
    totalBeds: 0,
    availableBeds: 0,
    amenities: [''],
    requirements: [''],
    operatorIds: []
  });
  const [residents, setResidents] = useState([]);
  const [analyticsFilter, setAnalyticsFilter] = useState('all');
  const [showConfirmDelete, setShowConfirmDelete] = useState({ show: false, type: '', id: null });

  // Simulated data fetch and mock user data
  useEffect(() => {
    // Simulating API call with timeout
    setTimeout(() => {
      // Mock houses data
      const mockHouses = [
        {
          id: 1,
          name: "Serenity House",
          address: "123 Recovery Lane",
          phone: "(555) 123-4567",
          totalBeds: 12,
          availableBeds: 3,
          amenities: ["WiFi", "Laundry", "Community Kitchen", "Group Room"],
          requirements: ["30 Days Sober", "Weekly House Meetings"],
          lastUpdated: "10:23 AM Today",
          operatorIds: [1, 3] // Operators who can edit this house
        },
        {
          id: 2,
          name: "New Beginnings",
          address: "456 Hope Street",
          phone: "(555) 987-6543",
          totalBeds: 8,
          availableBeds: 2,
          amenities: ["WiFi", "Cable TV", "Backyard", "Close to Transit"],
          requirements: ["Background Check", "Daily Check-ins"],
          lastUpdated: "9:45 AM Today",
          operatorIds: [2]
        },
        {
          id: 3,
          name: "Tranquility Center",
          address: "789 Peace Avenue",
          phone: "(555) 456-7890",
          totalBeds: 15,
          availableBeds: 0,
          amenities: ["Computer Lab", "Exercise Room", "Job Board", "Counselor On-site"],
          requirements: ["Interview Required", "Participation in Programs"],
          lastUpdated: "Yesterday 4:30 PM",
          operatorIds: [1, 2]
        },
        {
          id: 4,
          name: "Harmony House",
          address: "321 Wellness Way",
          phone: "(555) 234-5678",
          totalBeds: 10,
          availableBeds: 5,
          amenities: ["Meditation Room", "Garden", "Private Bathrooms", "Study Areas"],
          requirements: ["References", "Commitment to Recovery Plan"],
          lastUpdated: "8:15 AM Today",
          operatorIds: [3]
        }
      ];
      
      // Mock operators
      const mockOperators = [
        {
          id: 1,
          username: "john_operator",
          password: "pass123", // In a real app, this would be hashed
          name: "John Smith",
          houseIds: [1, 3]
        },
        {
          id: 2,
          username: "emma_operator",
          password: "pass123",
          name: "Emma Johnson",
          houseIds: [2, 3]
        },
        {
          id: 3,
          username: "david_operator",
          password: "pass123",
          name: "David Chen",
          houseIds: [1, 4]
        }
      ];
      
      // Mock credentials for admin
      const mockAdmin = {
        username: "admin",
        password: "admin123",
        name: "Admin User",
        role: "admin"
      };
      
      // Mock resident data for analytics
      const mockResidents = [
        {
          id: 1,
          name: "Alex Thompson",
          houseId: 1,
          entryDate: "2024-10-15",
          exitDate: "2025-03-01",
          source: "homeless",
          destination: "living with family",
          age: 34,
          gender: "male"
        },
        {
          id: 2,
          name: "Jamie Wilson",
          houseId: 1,
          entryDate: "2024-11-20",
          exitDate: null, // Still resident
          source: "incarceration",
          destination: null,
          age: 29,
          gender: "female"
        },
        {
          id: 3,
          name: "Morgan Lee",
          houseId: 2,
          entryDate: "2024-12-05",
          exitDate: "2025-02-10",
          source: "incarceration",
          destination: "recovery residence",
          age: 42,
          gender: "male"
        },
        {
          id: 4,
          name: "Riley Jackson",
          houseId: 3,
          entryDate: "2024-09-30",
          exitDate: "2025-01-15",
          source: "living with family",
          destination: "recovery residence",
          age: 26,
          gender: "female"
        },
        {
          id: 5,
          name: "Jordan Smith",
          houseId: 4,
          entryDate: "2024-08-15",
          exitDate: "2024-12-20",
          source: "homeless",
          destination: "homeless",
          age: 31,
          gender: "male"
        },
        {
          id: 6,
          name: "Casey Brown",
          houseId: 2,
          entryDate: "2024-11-10",
          exitDate: null, // Still resident
          source: "recovery residence",
          destination: null,
          age: 45,
          gender: "female"
        },
        {
          id: 7,
          name: "Taylor Reed",
          houseId: 1,
          entryDate: "2024-10-05",
          exitDate: "2025-03-10",
          source: "incarceration",
          destination: "living with family",
          age: 28,
          gender: "male"
        },
        {
          id: 8,
          name: "Jesse Morgan",
          houseId: 4,
          entryDate: "2024-12-15",
          exitDate: null, // Still resident
          source: "homeless",
          destination: null,
          age: 39,
          gender: "female"
        },
        {
          id: 9,
          name: "Quinn Roberts",
          houseId: 3,
          entryDate: "2024-09-20",
          exitDate: "2025-02-25",
          source: "living with family",
          destination: "incarceration",
          age: 33,
          gender: "male"
        },
        {
          id: 10,
          name: "Avery Peterson",
          houseId: 2,
          entryDate: "2024-07-30",
          exitDate: "2024-11-15",
          source: "recovery residence",
          destination: "living with family",
          age: 27,
          gender: "female"
        }
      ];
      
      setHouses(mockHouses);
      setOperators(mockOperators);
      setResidents(mockResidents);
      // Store mock admin in local state or context in a real app
      window.mockAdmin = mockAdmin;
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle house selection
  const handleHouseClick = (house) => {
    setSelectedHouse(house);
  };

  // Handle house editing for operators
  const handleEditHouse = (house) => {
    // Check if current operator has permission to edit this house
    if (userType === 'operator' && currentUser && 
        !house.operatorIds.includes(currentUser.id)) {
      alert("You don't have permission to edit this house.");
      return;
    }
    
    setIsEditing(true);
    setEditData({...house});
  };

  // Handle save edits
  const handleSaveEdits = () => {
    const updatedHouses = houses.map(house => 
      house.id === editData.id ? {...editData, lastUpdated: getCurrentTime()} : house
    );
    setHouses(updatedHouses);
    setSelectedHouse(editData);
    setIsEditing(false);
  };

  // Get current time for updates
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm} Today`;
  };

  // Toggle login modal
  const toggleLogin = () => {
    if (currentUser) {
      // Logout
      setCurrentUser(null);
      setUserType(null); // Set to null instead of 'endUser'
      setSelectedHouse(null);
      setIsEditing(false);
      setCurrentView('homes');
      setShowLogin(true); // Show login screen after logout
    } else {
      // Show login modal
      setShowLogin(true);
      setLoginForm({ username: '', password: '', role: 'viewer' });
      setLoginError('');
    }
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (loginForm.role === 'admin') {
      // Check admin credentials
      if (loginForm.username === window.mockAdmin.username && 
          loginForm.password === window.mockAdmin.password) {
        setCurrentUser(window.mockAdmin);
        setUserType('admin');
        setShowLogin(false);
      } else {
        setLoginError('Invalid admin credentials');
      }
    } else if (loginForm.role === 'operator') {
      // Check operator credentials
      const operator = operators.find(op => 
        op.username === loginForm.username && op.password === loginForm.password
      );
      
      if (operator) {
        setCurrentUser(operator);
        setUserType('operator');
        setShowLogin(false);
      } else {
        setLoginError('Invalid operator credentials');
      }
    } else if (loginForm.role === 'viewer') {
      // For viewer role, just check if username and password are non-empty
      // In a real app, you would validate against stored viewer credentials
      if (loginForm.username && loginForm.password) {
        setCurrentUser({
          username: loginForm.username,
          name: loginForm.username,
          role: 'viewer'
        });
        setUserType('viewer');
        setShowLogin(false);
      } else {
        setLoginError('Please provide both username and password');
      }
    }
  };

  // Add new operator
  const handleAddOperator = () => {
    if (!newOperator.username || !newOperator.password) {
      alert("Please provide username and password");
      return;
    }
    
    const newOperatorObj = {
      id: operators.length + 1,
      username: newOperator.username,
      password: newOperator.password,
      name: newOperator.username,
      houseIds: newOperator.assignedHouses
    };
    
    setOperators([...operators, newOperatorObj]);
    setNewOperator({ username: '', password: '', assignedHouses: [] });
  };

  // Toggle house assignment for new operator
  const toggleHouseAssignment = (houseId) => {
    if (newOperator.assignedHouses.includes(houseId)) {
      setNewOperator({
        ...newOperator,
        assignedHouses: newOperator.assignedHouses.filter(id => id !== houseId)
      });
    } else {
      setNewOperator({
        ...newOperator,
        assignedHouses: [...newOperator.assignedHouses, houseId]
      });
    }
  };

  // Update operator-house assignments
  const updateHouseOperator = (houseId, operatorId, isAssigned) => {
    // Update houses
    const updatedHouses = houses.map(house => {
      if (house.id === houseId) {
        return {
          ...house,
          operatorIds: isAssigned 
            ? [...house.operatorIds, operatorId]
            : house.operatorIds.filter(id => id !== operatorId)
        };
      }
      return house;
    });
    
    // Update operators
    const updatedOperators = operators.map(operator => {
      if (operator.id === operatorId) {
        return {
          ...operator,
          houseIds: isAssigned
            ? [...operator.houseIds, houseId]
            : operator.houseIds.filter(id => id !== houseId)
        };
      }
      return operator;
    });
    
    setHouses(updatedHouses);
    setOperators(updatedOperators);
  };

  // Add new home
  const handleAddHome = () => {
    if (!newHome.name || !newHome.address || !newHome.phone) {
      alert("Please provide home name, address, and phone number");
      return;
    }
    
    const newHomeObj = {
      id: houses.length + 1,
      ...newHome,
      lastUpdated: getCurrentTime(),
      operatorIds: []
    };
    
    setHouses([...houses, newHomeObj]);
    setNewHome({
      name: '',
      address: '',
      phone: '',
      totalBeds: 0,
      availableBeds: 0,
      amenities: [''],
      requirements: [''],
      operatorIds: []
    });
    setCurrentView('homes');
  };

  // Add or remove list items for amenities and requirements
  const handleListItemChange = (type, index, value) => {
    const updatedHome = {...newHome};
    updatedHome[type][index] = value;
    setNewHome(updatedHome);
  };

  const addListItem = (type) => {
    const updatedHome = {...newHome};
    updatedHome[type] = [...updatedHome[type], ''];
    setNewHome(updatedHome);
  };

  const removeListItem = (type, index) => {
    const updatedHome = {...newHome};
    updatedHome[type] = updatedHome[type].filter((_, i) => i !== index);
    setNewHome(updatedHome);
  };

  // Delete operator
  const handleDeleteOperator = (operatorId) => {
    // Remove operator from houses
    const updatedHouses = houses.map(house => ({
      ...house,
      operatorIds: house.operatorIds.filter(id => id !== operatorId)
    }));

    // Remove operator from list
    const updatedOperators = operators.filter(operator => operator.id !== operatorId);
    
    setHouses(updatedHouses);
    setOperators(updatedOperators);
    setShowConfirmDelete({ show: false, type: '', id: null });
  };

  // Delete home
  const handleDeleteHome = (homeId) => {
    // Remove home from operators
    const updatedOperators = operators.map(operator => ({
      ...operator,
      houseIds: operator.houseIds.filter(id => id !== homeId)
    }));

    // Remove home from list
    const updatedHouses = houses.filter(house => house.id !== homeId);
    
    setHouses(updatedHouses);
    setOperators(updatedOperators);
    setShowConfirmDelete({ show: false, type: '', id: null });
    
    if (selectedHouse && selectedHouse.id === homeId) {
      setSelectedHouse(null);
    }
  };

  // Show delete confirmation
  const confirmDelete = (type, id) => {
    setShowConfirmDelete({ show: true, type, id });
  };

  // Navigate to specific view
  const navigateTo = (view) => {
    setCurrentView(view);
    setSelectedHouse(null);
    setIsEditing(false);
  };

  // Analytics calculations
  const getAnalyticsData = () => {
    const filteredResidents = analyticsFilter === 'all' 
      ? residents 
      : residents.filter(r => r.houseId === parseInt(analyticsFilter));
    
    // Source statistics
    const sourceCounts = {
      homeless: 0,
      incarceration: 0,
      'living with family': 0,
      'recovery residence': 0
    };
    
    // Destination statistics
    const destinationCounts = {
      homeless: 0,
      incarceration: 0,
      'living with family': 0,
      'recovery residence': 0,
      'still resident': 0
    };
    
    // Length of stay statistics
    let totalStayDays = 0;
    let completedStays = 0;
    
    filteredResidents.forEach(resident => {
      // Count sources
      if (sourceCounts.hasOwnProperty(resident.source)) {
        sourceCounts[resident.source]++;
      }
      
      // Count destinations
      if (resident.exitDate) {
        if (destinationCounts.hasOwnProperty(resident.destination)) {
          destinationCounts[resident.destination]++;
        }
        
        // Calculate length of stay for completed stays
        const entryDate = new Date(resident.entryDate);
        const exitDate = new Date(resident.exitDate);
        const stayDays = Math.round((exitDate - entryDate) / (1000 * 60 * 60 * 24));
        totalStayDays += stayDays;
        completedStays++;
      } else {
        destinationCounts['still resident']++;
      }
    });
    
    // Average length of stay (in days)
    const averageStayDays = completedStays > 0 ? Math.round(totalStayDays / completedStays) : 0;
    
    return {
      sourceCounts,
      destinationCounts,
      averageStayDays,
      totalResidents: filteredResidents.length,
      currentResidents: destinationCounts['still resident']
    };
  };

  // Calculate total and available beds across all houses
  const totalBeds = houses.reduce((sum, house) => sum + house.totalBeds, 0);
  const totalAvailableBeds = houses.reduce((sum, house) => sum + house.availableBeds, 0);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Recovery Residences</h1>
          </div>
          <div className="flex items-center space-x-3">
            {/* Admin Navigation */}
            {userType === 'admin' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateTo('homes')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors duration-200 
                    ${currentView === 'homes' 
                      ? 'bg-teal-800 text-white' 
                      : 'bg-teal-700 hover:bg-teal-800 text-white'}`}
                >
                  <Home className="w-4 h-4" />
                  <span>Homes</span>
                </button>
                <button
                  onClick={() => navigateTo('operators')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors duration-200 
                    ${currentView === 'operators' 
                      ? 'bg-teal-800 text-white' 
                      : 'bg-teal-700 hover:bg-teal-800 text-white'}`}
                >
                  <Users className="w-4 h-4" />
                  <span>Operators</span>
                </button>
                <button
                  onClick={() => navigateTo('analytics')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors duration-200 
                    ${currentView === 'analytics' 
                      ? 'bg-teal-800 text-white' 
                      : 'bg-teal-700 hover:bg-teal-800 text-white'}`}
                >
                  <PieChart className="w-4 h-4" />
                  <span>Analytics</span>
                </button>
              </div>
            )}
            <button 
              onClick={toggleLogin}
              className="flex items-center space-x-1 bg-teal-700 hover:bg-teal-800 text-white px-3 py-1 rounded-lg transition-colors duration-200"
            >
              {currentUser ? 
                <><LogOut className="w-4 h-4" /><span>Logout {currentUser.name}</span></> : 
                <><LogIn className="w-4 h-4" /><span>Login</span></>
              }
            </button>
          </div>
        </div>
      </header>
      
      {/* Login Screen */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <Home className="w-8 h-8 text-teal-600" />
                <h1 className="text-2xl font-bold text-gray-800">Recovery Residences</h1>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Account Login</h2>
            <p className="text-gray-600 text-center mb-6">Please login to access recovery housing information</p>
            
            {loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-gray-300">
                    <input
                      type="radio"
                      checked={loginForm.role === 'viewer'}
                      onChange={() => setLoginForm({...loginForm, role: 'viewer'})}
                      className="sr-only"
                    />
                    <User className={`w-6 h-6 mb-1 ${loginForm.role === 'viewer' ? 'text-teal-600' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${loginForm.role === 'viewer' ? 'text-teal-600' : 'text-gray-600'}`}>Viewer</span>
                  </label>
                  <label className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-gray-300">
                    <input
                      type="radio"
                      checked={loginForm.role === 'operator'}
                      onChange={() => setLoginForm({...loginForm, role: 'operator'})}
                      className="sr-only"
                    />
                    <User className={`w-6 h-6 mb-1 ${loginForm.role === 'operator' ? 'text-teal-600' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${loginForm.role === 'operator' ? 'text-teal-600' : 'text-gray-600'}`}>Operator</span>
                  </label>
                  <label className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-gray-300">
                    <input
                      type="radio"
                      checked={loginForm.role === 'admin'}
                      onChange={() => setLoginForm({...loginForm, role: 'admin'})}
                      className="sr-only"
                    />
                    <Shield className={`w-6 h-6 mb-1 ${loginForm.role === 'admin' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${loginForm.role === 'admin' ? 'text-blue-600' : 'text-gray-600'}`}>Admin</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
              
              {loginForm.role === 'operator' && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Demo login: username "john_operator", password "pass123"</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-teal-700 text-teal-100 p-3 text-center text-sm">
        <p>Recovery Residents Association • Helping Find Safe Housing Since 2010</p>
      </footer>
      )}
    </div>
  );
};

export default RecoveryHousingApp;
              {loginForm.role === 'admin' && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Demo login: username "admin", password "admin123"</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      
      {/* Confirm Delete Modal */}
      {showConfirmDelete.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete this {showConfirmDelete.type}? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  showConfirmDelete.type === 'operator' 
                    ? handleDeleteOperator(showConfirmDelete.id) 
                    : handleDeleteHome(showConfirmDelete.id);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirmDelete({ show: false, type: '', id: null })}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:flex md:space-x-4 overflow-hidden">
        
        {/* Analytics Dashboard */}
        {userType === 'admin' && currentView === 'analytics' && (
          <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-100 p-4">
              <h2 className="font-medium text-blue-800 text-xl">Analytics Dashboard</h2>
              <p className="text-sm text-blue-700">Resident tracking and outcome metrics</p>
            </div>
            
            <div className="p-6">
              {/* Filter controls */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by House:</label>
                <select 
                  value={analyticsFilter} 
                  onChange={(e) => setAnalyticsFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full md:w-64"
                >
                  <option value="all">All Houses</option>
                  {houses.map(house => (
                    <option key={house.id} value={house.id}>{house.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Analytics widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Sources Widget */}
                <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-blue-600" />
                    Where Residents Come From
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(getAnalyticsData().sourceCounts).map(([source, count]) => (
                      <div key={source} className="flex items-center">
                        <div className="w-32 text-sm text-gray-600">{source}</div>
                        <div className="flex-1 mx-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500" 
                              style={{width: `${getAnalyticsData().totalResidents > 0 ? (count / getAnalyticsData().totalResidents) * 100 : 0}%`}}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium w-6 text-right text-gray-800">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Stay Length Widget */}
                <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Length of Stay
                  </h3>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {getAnalyticsData().averageStayDays}
                    </div>
                    <div className="text-sm text-gray-600">Average Days</div>
                    
                    <div className="mt-4 text-center">
                      <div className="text-lg font-medium text-gray-800">
                        {getAnalyticsData().currentResidents}
                      </div>
                      <div className="text-sm text-gray-600">Current Residents</div>
                    </div>
                  </div>
                </div>
                
                {/* Destinations Widget */}
                <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2 text-blue-600" />
                    Where Residents Go Next
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(getAnalyticsData().destinationCounts).map(([destination, count]) => (
                      <div key={destination} className="flex items-center">
                        <div className="w-32 text-sm text-gray-600">{destination}</div>
                        <div className="flex-1 mx-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${destination === 'still resident' ? 'bg-teal-500' : 'bg-green-500'}`} 
                              style={{width: `${getAnalyticsData().totalResidents > 0 ? (count / getAnalyticsData().totalResidents) * 100 : 0}%`}}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium w-6 text-right text-gray-800">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Residents table */}
              <h3 className="text-lg font-medium text-gray-800 mb-2">Resident Records</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">House</th>
                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Entry Date</th>
                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Exit Date</th>
                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Source</th>
                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-700">Destination</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {residents
                      .filter(resident => analyticsFilter === 'all' || resident.houseId === parseInt(analyticsFilter))
                      .map(resident => {
                        const house = houses.find(h => h.id === resident.houseId);
                        return (
                          <tr key={resident.id}>
                            <td className="py-2 px-3 text-sm">{resident.name}</td>
                            <td className="py-2 px-3 text-sm">{house ? house.name : '-'}</td>
                            <td className="py-2 px-3 text-sm">{resident.entryDate}</td>
                            <td className="py-2 px-3 text-sm">{resident.exitDate || 'Current'}</td>
                            <td className="py-2 px-3 text-sm">{resident.source}</td>
                            <td className="py-2 px-3 text-sm">{resident.exitDate ? resident.destination : 'N/A'}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Add Home View */}
        {userType === 'admin' && currentView === 'addHome' && (
          <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-100 p-4">
              <div className="flex justify-between items-center">
                <h2 className="font-medium text-blue-800 text-xl">Add New Recovery Home</h2>
                <button
                  onClick={() => navigateTo('homes')}
                  className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Homes</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">House Name</label>
                    <input
                      type="text"
                      value={newHome.name}
                      onChange={(e) => setNewHome({...newHome, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Serenity House"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={newHome.phone}
                      onChange={(e) => setNewHome({...newHome, phone: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={newHome.address}
                    onChange={(e) => setNewHome({...newHome, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="123 Recovery Lane"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Beds</label>
                    <input
                      type="number"
                      value={newHome.totalBeds}
                      onChange={(e) => setNewHome({...newHome, totalBeds: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Beds</label>
                    <input
                      type="number"
                      value={newHome.availableBeds}
                      onChange={(e) => setNewHome({...newHome, availableBeds: Math.min(parseInt(e.target.value), newHome.totalBeds)})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      min="0"
                      max={newHome.totalBeds}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                  {newHome.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={amenity}
                        onChange={(e) => handleListItemChange('amenities', index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        placeholder="e.g. WiFi, Laundry"
                      />
                      <button
                        type="button"
                        onClick={() => removeListItem('amenities', index)}
                        className="ml-2 p-2 text-red-600 hover:text-red-800 rounded-md"
                        disabled={newHome.amenities.length <= 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addListItem('amenities')}
                    className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Another Amenity
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                  {newHome.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleListItemChange('requirements', index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        placeholder="e.g. 30 Days Sober"
                      />
                      <button
                        type="button"
                        onClick={() => removeListItem('requirements', index)}
                        className="ml-2 p-2 text-red-600 hover:text-red-800 rounded-md"
                        disabled={newHome.requirements.length <= 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addListItem('requirements')}
                    className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Another Requirement
                  </button>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleAddHome}
                    className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 inline mr-1" />
                    Add Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Admin Operator Management */}
        {userType === 'admin' && currentView === 'operators' && (
          <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-100 p-4">
              <h2 className="font-medium text-blue-800 text-xl">Manage Operators</h2>
              <p className="text-sm text-blue-700">Assign operators to specific houses</p>
            </div>
            
            <div className="p-6">
              {/* Add new operator form */}
              <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-3">Add New Operator</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      value={newOperator.username}
                      onChange={(e) => setNewOperator({...newOperator, username: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={newOperator.password}
                      onChange={(e) => setNewOperator({...newOperator, password: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Assign Houses:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {houses.map(house => (
                      <label key={house.id} className="flex items-center space-x-2 p-2 border rounded-md">
                        <input
                          type="checkbox"
                          checked={newOperator.assignedHouses.includes(house.id)}
                          onChange={() => toggleHouseAssignment(house.id)}
                        />
                        <span className="text-sm">{house.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleAddOperator}
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                  <UserPlus className="w-4 h-4 inline mr-1" />
                  Add Operator
                </button>
              </div>
              
              {/* Existing operators */}
              <div className="mb-6 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Current Operators</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Operator</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Username</th>
                      {houses.map(house => (
                        <th key={house.id} className="py-2 px-4 text-center text-sm font-medium text-gray-700">
                          {house.name}
                        </th>
                      ))}
                      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {operators.map(operator => (
                      <tr key={operator.id}>
                        <td className="py-3 px-4 text-sm">{operator.name}</td>
                        <td className="py-3 px-4 text-sm">{operator.username}</td>
                        {houses.map(house => (
                          <td key={house.id} className="py-3 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={operator.houseIds.includes(house.id)}
                              onChange={(e) => updateHouseOperator(house.id, operator.id, e.target.checked)}
                              className="h-4 w-4"
                            />
                          </td>
                        ))}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => confirmDelete('operator', operator.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Home Listing and Details - for Admin Homes view, Operator view, or End User view */}
        {(userType === 'endUser' || userType === 'operator' || (userType === 'admin' && currentView === 'homes')) && (
          <>
            {/* Left panel - Houses List */}
            <div className="md:w-2/5 lg:w-1/3 bg-white rounded-lg shadow-md overflow-hidden mb-4 md:mb-0">
              
              {/* Summary statistics */}
              <div className="bg-blue-100 p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-medium text-blue-800">Available Beds</h2>
                  
                  {userType === 'admin' && (
                    <button
                      onClick={() => navigateTo('addHome')}
                      className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md text-sm transition-colors duration-200"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Home</span>
                    </button>
                  )}
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <Bed className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-800">{totalAvailableBeds}</span>
                  <span className="text-sm text-blue-600">of {totalBeds} total</span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-blue-700 px-4 py-2 bg-blue-50">
                <div className="flex items-center">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  <span>Last updated: Now</span>
                </div>
                <div>{houses.length} houses</div>
              </div>
              
              {/* Houses list */}
              <div className="overflow-y-auto" style={{maxHeight: 'calc(100vh - 260px)'}}>
                {isLoading ? (
                  <div className="p-8 text-center text-gray-500">
                    <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                    <p>Loading houses...</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {houses.map(house => (
                      <li 
                        key={house.id}
                        className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${selectedHouse?.id === house.id ? 'bg-blue-100' : ''}`}
                        onClick={() => handleHouseClick(house)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">{house.name}</h3>
                            <p className="text-sm text-gray-600">{house.address}</p>
                          </div>
                          <div className="flex items-center">
                            <div className={`text-center px-3 py-1 rounded-full text-sm font-medium ${house.availableBeds > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {house.availableBeds} {house.availableBeds === 1 ? 'bed' : 'beds'}
                            </div>
                            {userType === 'admin' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete('house', house.id);
                                }}
                                className="ml-2 text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Updated: {house.lastUpdated}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            {/* Right panel - House Details */}
            <div className="md:w-3/5 lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
              {selectedHouse ? (
                isEditing ? (
                  /* Operator or Admin Edit Mode */
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit House Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">House Name</label>
                        <input 
                          type="text" 
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Total Beds</label>
                          <input 
                            type="number" 
                            value={editData.totalBeds}
                            onChange={(e) => setEditData({...editData, totalBeds: parseInt(e.target.value)})}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Available Beds</label>
                          <input 
                            type="number" 
                            value={editData.availableBeds}
                            onChange={(e) => setEditData({
                              ...editData, 
                              availableBeds: Math.min(parseInt(e.target.value), editData.totalBeds)
                            })}
                            max={editData.totalBeds}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 pt-4">
                        <button 
                          onClick={handleSaveEdits}
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* House Detail View */
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">{selectedHouse.name}</h2>
                      {(userType === 'operator' && currentUser && selectedHouse.operatorIds.includes(currentUser.id)) || 
                       (userType === 'admin') ? (
                        <button 
                          onClick={() => handleEditHouse(selectedHouse)}
                          className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-md transition-colors duration-150"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      ) : null}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-700 flex items-center">
                            <Info className="w-4 h-4 mr-2 text-blue-600" />
                            Contact Information
                          </h3>
                          <div className="mt-2 ml-6 space-y-1 text-gray-600">
                            <p>{selectedHouse.address}</p>
                            <p>{selectedHouse.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-gray-700 flex items-center">
                            <Settings className="w-4 h-4 mr-2 text-blue-600" />
                            Amenities
                          </h3>
                          <ul className="mt-2 ml-6 space-y-1">
                            {selectedHouse.amenities.map((amenity, index) => (
                              <li key={index} className="text-gray-600">• {amenity}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-700 flex items-center">
                            <Bed className="w-4 h-4 mr-2 text-blue-600" />
                            Bed Availability
                          </h3>
                          <div className="mt-2 ml-6">
                            <div className="flex items-center mb-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full ${selectedHouse.availableBeds > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                                  style={{width: `${(selectedHouse.availableBeds / selectedHouse.totalBeds) * 100}%`}}
                                ></div>
                              </div>
                            </div>
                            <p className="text-gray-600">
                              <span className={`font-medium ${selectedHouse.availableBeds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {selectedHouse.availableBeds} of {selectedHouse.totalBeds}
                              </span> beds available
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Last updated: {selectedHouse.lastUpdated}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-gray-700 flex items-center">
                            <Info className="w-4 h-4 mr-2 text-blue-600" />
                            Requirements
                          </h3>
                          <ul className="mt-2 ml-6 space-y-1">
                            {selectedHouse.requirements.map((requirement, index) => (
                              <li key={index} className="text-gray-600">• {requirement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                /* No house selected view */
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <Bed className="w-16 h-16 text-blue-300 mb-4" />
                  <h2 className="text-xl font-medium text-gray-700 mb-2">Select a house</h2>
                  <p className="text-gray-500 max-w-md">
                    Choose a recovery residence from the list to view detailed information and current bed availability.
                  </p>
                </div>
              )}
