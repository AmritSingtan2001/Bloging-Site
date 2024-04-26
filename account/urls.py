from django.urls import path
from account.views import  *


urlpatterns = [
    path('profile', UserProfileView.as_view(), name='profile'),
    path('update/profile', UserProfileView.as_view(), name='profile'),
    path('change/password', UserChangePasswordView.as_view(), name='changepassword'),
    path('forgot/password', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset/password/<uid>/<token>', UserPasswordResetView.as_view(), name='reset-password'),
    path('logout', LogoutView.as_view(), name='logout'),

]