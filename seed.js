import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Project from './src/models/Project.js';
import Service from './src/models/Service.js';
import Amenity from './src/models/Amenity.js';
import Enquiry from './src/models/Enquiry.js';

// Load env vars
dotenv.config();

const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@craftedhomecare.com',
    password: 'password123',
    role: 'admin',
    phone: '1234567890'
  }
];

const projects = [
  {
    title: 'Serenity Villas',
    slug: 'serenity-villas',
    location: 'Lonavala, Maharashtra',
    type: 'Villa',
    status: 'Upcoming',
    year: '2024',
    area: '4,500 sq.ft',
    priceRange: '₹2.8 Cr - ₹4.5 Cr',
    configuration: '4-5 BHK',
    description: 'Luxury hillside villas with panoramic views and sustainable design.',
    fullDescription: 'Serenity Villas bring you closer to nature without compromising on luxury. These eco-friendly villas feature rainwater harvesting, solar panels, and organic gardens. The architectural design maximizes natural light and ventilation while providing spacious living areas. Perfect for environmentally conscious families who want to reduce their carbon footprint while enjoying a premium lifestyle. The community includes nature trails and a central park.',
    tags: ['Luxury', 'Eco-Friendly', 'Smart Home'],
    highlights: ['Futuristic climate-responsive design', 'Premium material selection', 'Full documentation & manual'],
    image: 'project-serenity-villas.jpg', // Placeholder image ref
    specifications: {
      bedrooms: '4-5 BHK',
      bathrooms: '5-6',
      area: '3800-5200 sq.ft',
      parking: '3 Cars',
    },
    amenities: [
      'Solar Power System',
      'Rainwater Harvesting',
      'Organic Garden Space',
      'Central Park',
      'Nature Trails',
      'Eco-Friendly Materials',
      'Energy Efficient Lighting',
      'Waste Management',
      'Electric Vehicle Charging',
      'Green Building Certified',
    ],
    isActive: true,
    isFeatured: true
  },
  {
    title: 'Greenwood Heights',
    slug: 'greenwood-heights',
    location: 'Pune, Maharashtra',
    type: 'Gated Community',
    status: 'Ongoing',
    year: '2023',
    area: '12 Acres',
    priceRange: '₹1.2 Cr - ₹2.5 Cr',
    configuration: '2-4 BHK',
    description: 'Premium gated community with world-class amenities and green spaces.',
    fullDescription: 'Greenwood Heights is a sprawling 12-acre gated community that redefines urban living. With over 25 world-class amenities, lush green landscapes, and a focus on community living, this project offers the perfect balance of privacy and social interaction. The design incorporates wide roads, ample parking, and dedicated play areas for children. Security is paramount with 24/7 surveillance and controlled access.',
    tags: ['Community', 'Amenities', 'Premium'],
    highlights: ['25+ amenities', 'Certified craftsmen', 'Lifetime maintenance support'],
    image: 'project-greenwood-heights.jpg',
    specifications: {
      bedrooms: '2-4 BHK',
      bathrooms: '2-4',
      area: '1200-2800 sq.ft',
      parking: '2 Cars',
    },
    amenities: [
      'Swimming Pool',
      'Clubhouse',
      'Gymnasium',
      'Children Play Area',
      'Jogging Track',
      'Tennis Court',
      'Basketball Court',
      'Multipurpose Hall',
      '24/7 Security',
      'Power Backup',
    ],
    isActive: true,
    isFeatured: true
  },
  {
    title: 'Azure Residences',
    slug: 'azure-residences',
    location: 'Mumbai, Maharashtra',
    type: 'Apartment',
    status: 'Completed',
    year: '2024',
    area: '2,800 sq.ft',
    priceRange: '₹3.5 Cr - ₹5.2 Cr',
    configuration: '3-4 BHK',
    description: 'High-rise luxury apartments with sea-facing views and modern interiors.',
    fullDescription: 'Azure Residences offers an unparalleled living experience with breathtaking sea views from every apartment. Located in the heart of Mumbai, these high-rise apartments combine luxury with convenience. The interiors feature imported marble flooring, modular kitchens, and smart home automation. Residents enjoy exclusive access to a rooftop infinity pool, sky lounge, and private cinema.',
    tags: ['Sea View', 'High-Rise', 'Modern'],
    highlights: ['Proof-of-concept approach', 'Material care certified', 'Smart home ready'],
    image: 'project-azure-residences.jpg',
    specifications: {
      bedrooms: '3-4 BHK',
      bathrooms: '3-4',
      area: '2200-3200 sq.ft',
      parking: '2 Cars',
    },
    amenities: [
      'Infinity Pool',
      'Sky Lounge',
      'Private Cinema',
      'Concierge Service',
      'Valet Parking',
      'Spa & Wellness',
      'Business Center',
      'Rooftop Garden',
      'High-Speed Elevators',
      'Smart Home Features',
    ],
    isActive: true,
    isFeatured: true
  },
  {
    title: 'Sunrise Estates',
    slug: 'sunrise-estates',
    location: 'Nashik, Maharashtra',
    type: 'Villa',
    status: 'Completed',
    year: '2023',
    area: '3,200 sq.ft',
    priceRange: '₹1.8 Cr - ₹2.8 Cr',
    configuration: '3-4 BHK',
    description: 'Contemporary villas with vineyard views and premium finishes.',
    fullDescription: 'Sunrise Estates offers a unique vineyard living experience in the heart of Nashik wine country. These contemporary villas feature floor-to-ceiling windows, private gardens, and premium finishes throughout. Wake up to stunning sunrise views over the vineyards and enjoy the tranquil countryside atmosphere while being connected to urban amenities.',
    tags: ['Contemporary', 'Vineyard View', 'Premium'],
    highlights: ['Climate-resilient design', 'Complete handover documentation', 'AMC available'],
    image: 'service-interiors.jpg',
    specifications: {
      bedrooms: '3-4 BHK',
      bathrooms: '3-4',
      area: '2800-3600 sq.ft',
      parking: '2 Cars',
    },
    amenities: [
      'Private Garden',
      'Outdoor Deck',
      'Wine Cellar',
      'Home Theater',
      'Modular Kitchen',
      'Guest Suite',
      'Study Room',
      'Terrace Garden',
      'Solar Panels',
      'Rainwater Harvesting',
    ],
    isActive: true,
    isFeatured: false
  },
  {
    title: 'Heritage Renovation',
    slug: 'heritage-renovation',
    location: 'Old Mumbai',
    type: 'Renovation',
    status: 'Completed',
    year: '2024',
    area: '5,000 sq.ft',
    priceRange: '₹4.5 Cr - ₹6.0 Cr',
    configuration: '4-5 BHK',
    description: 'Meticulous restoration of a heritage bungalow with modern amenities.',
    fullDescription: 'This heritage renovation project showcases our expertise in preserving architectural legacy while integrating modern comforts. The 100-year-old bungalow has been meticulously restored, maintaining its original charm with antique wooden doors, traditional tiles, and ornate ceilings. Modern amenities including smart home systems, updated plumbing, and energy-efficient solutions have been seamlessly integrated.',
    tags: ['Heritage', 'Restoration', 'Modern Amenities'],
    highlights: ['Heritage preservation', 'Modern utility integration', 'Skilled specialist craftsmen'],
    image: 'project-apartment.jpg',
    specifications: {
      bedrooms: '4-5 BHK',
      bathrooms: '4-5',
      area: '4500-5500 sq.ft',
      parking: '4 Cars',
    },
    amenities: [
      'Restored Antique Features',
      'Modern HVAC System',
      'Smart Home Integration',
      'Landscaped Garden',
      'Vintage Library',
      'Private Courtyard',
      'Butler Pantry',
      'Wine Room',
      'Art Gallery Space',
      'Heritage Certification',
    ],
    isActive: true,
    isFeatured: false
  },
  {
    title: 'Palm Gardens',
    slug: 'palm-gardens',
    location: 'Goa',
    type: 'Gated Community',
    status: 'Ongoing',
    year: '2022',
    area: '8 Acres',
    priceRange: '₹1.5 Cr - ₹3.0 Cr',
    configuration: '2-4 BHK',
    description: 'Beachside community living with tropical architecture and resort amenities.',
    fullDescription: 'Palm Gardens brings resort-style living to Goa with its tropical architecture and premium amenities. Set across 8 acres with swaying palm trees and landscaped gardens, this community offers a vacation lifestyle every day. The design incorporates open layouts, outdoor living spaces, and easy beach access. Enjoy the clubhouse, multiple pools, and sports facilities.',
    tags: ['Beach', 'Resort Living', 'Tropical'],
    highlights: ['Coastal-resilient construction', 'Resort-style amenities', 'Full lifecycle support'],
    image: 'amenity-pool.jpg',
    specifications: {
      bedrooms: '2-4 BHK',
      bathrooms: '2-4',
      area: '1400-3000 sq.ft',
      parking: '2 Cars',
    },
    amenities: [
      'Beach Access',
      'Multiple Swimming Pools',
      'Beach Cabanas',
      'Water Sports Facility',
      'Beachfront Restaurant',
      'Spa & Massage',
      'Yoga Pavilion',
      'Kids Water Park',
      'Sunset Lounge',
      'Barbecue Area',
    ],
    isActive: true,
    isFeatured: false
  }
];

const services = [
  {
    title: "New Construction",
    description: "From foundation to finish, we build homes that are designed to last with careful planning and exceptional craftsmanship.",
    icon: "Building2",
    image: "service-construction.jpg",
    features: ["Complete construction management", "Quality materials", "Timely delivery", "Lifetime support"],
    order: 1,
    isActive: true
  },
  {
    title: "Architecture & Planning",
    description: "Future-ready designs that balance aesthetics with utility. Every plan is climate-responsive and practical for Indian lifestyles.",
    icon: "Compass",
    image: "service-interiors.jpg",
    features: ["Climate-responsive design", "3D visualization", "Vastu consultation", "Detailed blueprints"],
    order: 2,
    isActive: true
  },
  {
    title: "Interior Design",
    description: "Thoughtful interiors that reflect your personality. We design spaces that are both beautiful and functional.",
    icon: "PaintBucket",
    image: "service-construction.jpg",
    features: ["Custom furniture design", "Color consultation", "Space planning", "Lighting design"],
    order: 3,
    isActive: true
  },
  {
    title: "Renovation & Remodeling",
    description: "Breathe new life into your existing space. We handle everything from small updates to complete transformations.",
    icon: "Home",
    image: "service-interiors.jpg",
    features: ["Kitchen remodeling", "Bathroom upgrades", "Space optimization", "Heritage restoration"],
    order: 4,
    isActive: true
  },
  {
    title: "Project Management",
    description: "End-to-end coordination and oversight. We ensure timely completion while maintaining quality at every milestone.",
    icon: "FileText",
    image: "service-construction.jpg",
    features: ["Timeline management", "Budget control", "Quality assurance", "Regular updates"],
    order: 5,
    isActive: true
  },
  {
    title: "Lifetime Maintenance",
    description: "We don't just build and walk away. Our maintenance support ensures your home stays in perfect condition for years.",
    icon: "Wrench",
    image: "service-interiors.jpg",
    features: ["Regular inspections", "Emergency repairs", "Warranty support", "Annual maintenance"],
    order: 6,
    isActive: true
  }
];

const amenities = [
  {
    title: "Gym & Fitness",
    description: "State-of-the-art fitness centers with modern equipment, personal training areas, and dedicated zones for cardio, strength training, and functional fitness.",
    icon: "Dumbbell",
    image: "amenity-gym.jpg",
    features: ["Modern cardio equipment", "Free weights & machines", "Personal training available", "Group fitness classes"],
    order: 1,
    isActive: true
  },
  {
    title: "Wellness & Spa",
    description: "Meditation rooms, yoga decks, and spa facilities for complete relaxation. Rejuvenate your mind and body without leaving your community.",
    icon: "Flower2",
    image: "amenity-wellness.jpg",
    features: ["Meditation rooms", "Yoga & pilates studio", "Spa treatments", "Wellness consultations"],
    order: 2,
    isActive: true
  },
  {
    title: "Recreation",
    description: "Indoor games, clubhouses, and entertainment zones for all ages. From table tennis to billiards, cards to board games.",
    icon: "Gamepad2",
    image: "amenity-recreation.jpg",
    features: ["Table tennis", "Billiards", "Board games", "Entertainment lounge"],
    order: 3,
    isActive: true
  },
  {
    title: "Kids Play Area",
    description: "Safe and engaging play zones designed for children of all ages with modern equipment and soft surfaces.",
    icon: "Baby",
    image: "amenity-recreation.jpg",
    features: ["Safe play equipment", "Soft surfaces", "Age-appropriate zones", "Supervised play areas"],
    order: 4,
    isActive: true
  },
  {
    title: "Commodities",
    description: "Convenience stores and daily essentials at your doorstep. Shop for groceries, medicines, and more without stepping out.",
    icon: "ShoppingBag",
    image: "amenity-commodities.jpg",
    features: ["Grocery store", "Pharmacy", "ATM services", "Daily essentials"],
    order: 5,
    isActive: true
  },
  {
    title: "Landscapes",
    description: "Beautifully landscaped gardens with walking paths, water features, and green spaces that create a serene environment.",
    icon: "TreeDeciduous",
    image: "amenity-landscape.jpg",
    features: ["Walking paths", "Water features", "Garden seating", "Native plants"],
    order: 6,
    isActive: true
  },
  {
    title: "Swimming Pool",
    description: "Temperature-controlled swimming pools for all seasons. Dedicated lanes for lap swimming and separate areas for leisure.",
    icon: "Waves",
    image: "amenity-pool.jpg",
    features: ["Temperature controlled", "Lap swimming lanes", "Kids pool", "Pool deck & loungers"],
    order: 7,
    isActive: true
  }
];

const enquiries = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    message: "Interested in Serenity Villas",
    projectType: "Villa",
    projectName: "Serenity Villas",
    budget: "₹2.8 Cr - ₹4.5 Cr",
    location: "Lonavala, Maharashtra",
    status: "new"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "0987654321",
    message: "Looking for apartment in Mumbai",
    projectType: "Apartment",
    projectName: "Azure Residences",
    budget: "₹3.5 Cr - ₹5.2 Cr",
    location: "Mumbai, Maharashtra",
    status: "contacted"
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "1112223334",
    message: "Need renovation services",
    projectType: "Renovation",
    budget: "₹4.5 Cr - ₹6.0 Cr",
    location: "Old Mumbai",
    status: "closed"
  }
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Project.deleteMany();
    await Service.deleteMany();
    await Amenity.deleteMany();
    await User.deleteMany();
    await Enquiry.deleteMany();

    console.log('Inserting data...');
    
    // Create Users
    await User.create(users);
    console.log('Users Imported!');

    // Create Projects
    await Project.create(projects);
    console.log('Projects Imported!');

    // Create Services
    await Service.create(services);
    console.log('Services Imported!');

    // Create Amenities
    await Amenity.create(amenities);
    console.log('Amenities Imported!');

    // Create Enquiries
    await Enquiry.create(enquiries);
    console.log('Enquiries Imported!');

    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    
    await Project.deleteMany();
    await Service.deleteMany();
    await Amenity.deleteMany();
    await User.deleteMany();
    await Enquiry.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
