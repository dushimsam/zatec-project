# Set the base image for subsequent instructions
FROM php:8.0.11-apache

# Set the working directory
WORKDIR /var/www/html

# Copy the application code
COPY . .

# Install required PHP extensions
RUN docker-php-ext-install pdo_mysql

# Enable Apache rewrite module
RUN a2enmod rewrite


# Expose port 8000 for web traffic
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
