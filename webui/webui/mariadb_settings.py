# mariadb_settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'archieDB',
        'USER': 'robotwebui',
        'PASSWORD': 'webui123&',
        'HOST': '', # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '', # Set to empty string for default
        'OPTIONS': {                                                            
	        'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"                                        
        }  
    }
}

