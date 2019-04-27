from django.db import models
class User(models.Model):
    name = models.CharField(unique=True)
    password = models.CharField
    c_time = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['c_time']
	verbose_name = 'user'
	verbose_name_plural = 'user'
# Create your models here.
