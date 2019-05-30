from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.paster, name="paster_index"),
    path('post_text/', views.post_text, name="post_text"),
    path('delete_text/', views.delete_text, name="delete_text")
]
