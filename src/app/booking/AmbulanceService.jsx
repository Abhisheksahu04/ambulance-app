// services/ambulanceService.js
const MUMBAI_HOSPITALS = [
  { lat: 19.1832, lng: 72.8359, name: "Lilavati Hospital" },
  { lat: 19.1176, lng: 72.8484, name: "Nanavati Hospital" },
  { lat: 19.0219, lng: 72.8467, name: "Breach Candy Hospital" },
  { lat: 18.9548, lng: 72.8053, name: "Jaslok Hospital" },
  { lat: 19.0213, lng: 72.8426, name: "Bhatia Hospital" },
];

export const findNearbyAmbulances = async (location) => {
  // In a real app, this would be an API call to your backend
  // Here we'll simulate finding nearby ambulances
  const ambulances = MUMBAI_HOSPITALS.map((hospital, index) => {
    const distance = calculateDistance(
      location.lat,
      location.lng,
      hospital.lat,
      hospital.lng
    );

    return {
      id: index + 1,
      type: [
        "Basic Life Support",
        "Advanced Life Support",
        "Patient Transport",
      ][Math.floor(Math.random() * 3)],
      vehicleNumber: `MH${Math.floor(Math.random() * 99)}${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}${Math.floor(Math.random() * 9999)}`,
      driverName: generateDriverName(),
      distance: distance.toFixed(1),
      eta: `${Math.ceil(distance * 3)} mins`,
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      available: true,
      hospitalName: hospital.name,
      location: {
        lat: hospital.lat,
        lng: hospital.lng,
      },
    };
  });

  // Sort by distance
  return ambulances.sort(
    (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
  );
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const generateDriverName = () => {
  const firstNames = ["Rajesh", "Amit", "Suresh", "Priya", "Rahul", "Sanjay"];
  const lastNames = ["Kumar", "Singh", "Sharma", "Patel", "Shah", "Verma"];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
};
