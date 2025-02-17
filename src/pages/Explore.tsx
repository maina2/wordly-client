import './explore.css';

const posts = [
    {
      id: '1',
      title: 'The Future of Web Development in 2025',
      content: 'Exploring the latest trends in web development, from AI-powered tools to new frameworks that are revolutionizing how we build applications. Discover how the landscape of web development is evolving and what skills will be crucial for developers in the coming years.',
      author: {
        username: 'Sarah Chen',
        avatar: '/api/placeholder/150/150',
        role: 'Tech Lead'
      },
      category: 'Technology',
      featured: true
    },
    {
      id: '2',
      title: 'Mindful Living: A Guide to Daily Wellness',
      content: 'Discover simple yet effective practices for incorporating mindfulness into your daily routine and improving your overall well-being. Learn how small changes in your daily habits can lead to significant improvements in your mental and physical health.',
      author: {
        username: 'Mark Johnson',
        avatar: '/api/placeholder/150/150',
        role: 'Wellness Coach'
      },
      category: 'Wellness',
      featured: true
    },
    {
      id: '3',
      title: 'Sustainable Design Principles',
      content: 'How modern architects and designers are incorporating eco-friendly practices into their work while maintaining aesthetic appeal. Explore the intersection of sustainability and modern design principles.',
      author: {
        username: 'Emma Wright',
        avatar: '/api/placeholder/150/150',
        role: 'Design Director'
      },
      category: 'Design'
    },
    {
      id: '4',
      title: 'The Art of Street Photography',
      content: 'Tips and techniques for capturing compelling street photography that tells authentic stories. Learn how to observe and document urban life through your lens.',
      author: {
        username: 'David Kim',
        avatar: '/api/placeholder/150/150',
        role: 'Photographer'
      },
      category: 'Photography'
    },
    {
      id: '5',
      title: 'Modern Kitchen Essentials',
      content: 'A curated guide to must-have tools and appliances for the contemporary home chef. Discover how to optimize your kitchen space with the right equipment for your cooking needs.',
      author: {
        username: 'Lisa Martinez',
        avatar: '/api/placeholder/150/150',
        role: 'Food Writer'
      },
      category: 'Lifestyle'
    },
    {
      id: '6',
      title: 'Financial Planning for Millennials',
      content: 'Smart investment strategies and money management tips tailored for the younger generation. Learn how to build wealth and secure your financial future with practical advice.',
      author: {
        username: 'Alex Thompson',
        avatar: '/api/placeholder/150/150',
        role: 'Financial Advisor'
      },
      category: 'Finance'
    }
  ];

const Explore = () => {
  return (
    <div className="explore">
      <div className="explore__container">
        <header className="explore__header">
          <h1 className="explore__title">Explore Trending Stories</h1>
          <p className="explore__subtitle">Discover insightful articles from our community of experts</p>
        </header>

        <section className="featured-posts">
          {posts.filter(post => post.featured).map(post => (
            <article key={post.id} className="post-card post-card--featured">
              <div className="post-card__content">
                <span className="post-card__category">{post.category}</span>
                <h2 className="post-card__title">{post.title}</h2>
                <p className="post-card__text">{post.content}</p>
                <div className="post-card__author">
                  <img src={post.author.avatar} alt={post.author.username} className="author__avatar" />
                  <div className="author__info">
                    <p className="author__name">{post.author.username}</p>
                    <p className="author__role">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="regular-posts">
          {posts.filter(post => !post.featured).map(post => (
            <article key={post.id} className="post-card">
              <div className="post-card__content">
                <span className="post-card__category">{post.category}</span>
                <h2 className="post-card__title">{post.title}</h2>
                <p className="post-card__text">{post.content}</p>
                <div className="post-card__author">
                  <img src={post.author.avatar} alt={post.author.username} className="author__avatar" />
                  <div className="author__info">
                    <p className="author__name">{post.author.username}</p>
                    <p className="author__role">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Explore;