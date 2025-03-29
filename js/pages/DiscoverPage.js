import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaUserPlus } from 'react-icons/fa';

function DiscoverPage() {
  // Mock data for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Jamie Chen",
        college: "Tech University",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
        mutualInterests: ["Tech", "Programming"]
      },
      content: "Working on a new React project for my web development class. Anyone want to collaborate?",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500",
      likes: 15,
      comments: 4,
      time: "2 hours ago",
      liked: false
    },
    {
      id: 2,
      user: {
        name: "Taylor Smith",
        college: "State College",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        mutualInterests: ["Sports", "Music"]
      },
      content: "Great game last night! Our team crushed it 🏀 #collegesports",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
      likes: 42,
      comments: 8,
      time: "5 hours ago",
      liked: true
    }
  ]);

  // Mock data for suggested people
  const [suggestedPeople, setSuggestedPeople] = useState([
    {
      id: 1,
      name: "Morgan Lee",
      college: "Tech University",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      mutualInterests: ["Tech", "AI"],
      followed: false
    },
    {
      id: 2,
      name: "Casey Jordan",
      college: "State College",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100",
      mutualInterests: ["Sports", "Photography"],
      followed: true
    }
  ]);

  // Handle like post
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Handle follow user
  const handleFollow = (userId) => {
    setSuggestedPeople(suggestedPeople.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          followed: !user.followed
        };
      }
      return user;
    }));
  };

  // Infinite scroll simulation
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newPosts = [...Array(2)].map((_, i) => ({
        id: posts.length + i + 1,
        user: {
          name: `User ${posts.length + i + 1}`,
          college: "Sample College",
          avatar: `https://i.pravatar.cc/100?img=${posts.length + i + 1}`,
          mutualInterests: ["Sample"]
        },
        content: `This is sample post ${posts.length + i + 1}`,
        image: `https://picsum.photos/500/300?random=${posts.length + i + 1}`,
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 10),
        time: `${Math.floor(Math.random() * 24)} hours ago`,
        liked: false
      }));
      
      setPosts([...posts, ...newPosts]);
      setLoading(false);
      if (posts.length >= 10) setHasMore(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= 
          document.documentElement.offsetHeight - 100) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [posts]);

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Discover Posts</h2>
          
          {/* Posts */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {post.user.college} • {post.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="mb-4">{post.content}</p>
              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-auto rounded-lg mb-4"
                />
              )}

              {/* Post Actions */}
              <div className="flex justify-between text-gray-500">
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : 'hover:text-red-500'}`}
                  >
                    {post.liked ? <FaHeart /> : <FaRegHeart />} {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <FaComment /> {post.comments}
                  </button>
                </div>
                <button className="hover:text-blue-600">
                  <FaShare />
                </button>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
        </div>

        {/* Suggested People */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">People You May Know</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            {suggestedPeople.map(person => (
              <div key={person.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={person.avatar} 
                    alt={person.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-gray-500">
                      {person.college} • {person.mutualInterests.join(", ")}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleFollow(person.id)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    person.followed 
                      ? 'bg-gray-200 text-gray-700' 
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {person.followed ? 'Following' : (
                    <>
                      <FaUserPlus className="inline mr-1" /> Follow
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Interest-Based Recommendations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-3">Based on Your Interests</h3>
            <div className="space-y-3">
              {[
                { name: "Tech Club", members: 124, common: "Tech" },
                { name: "Photography Group", members: 89, common: "Photography" },
                { name: "Basketball Team", members: 15, common: "Sports" }
              ].map((group, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{group.name}</h4>
                    <p className="text-sm text-gray-500">
                      {group.members} members • {group.common}
                    </p>
                  </div>
                  <button className="text-blue-600 text-sm font-medium">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverPage;