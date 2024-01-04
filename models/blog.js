module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  return Blog;
};
