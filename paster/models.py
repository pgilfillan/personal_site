from django.db import models

class PasteText(models.Model):
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)