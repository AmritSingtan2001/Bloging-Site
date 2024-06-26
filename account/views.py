from django.shortcuts import render, redirect
from rest_framework.response import Response
from django.contrib.auth import login,logout
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import  (UserLoginSerializer, 
                                  UserRegistrationSerializer,
                                  UserProfileSerializer,
                                  UserChangePasswordSerializer,
                                  SendPasswordResetEmailSerializer,
                                  UserPasswordResetSerializer,
                                  UserSerializer,
                                 
                                )
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from . models import User
from django.contrib.auth.hashers import make_password, check_password
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics

# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }



class UserRegistrationView(APIView):
  #renderer_classes = [UserRenderer]
  def post(self, request, format=None):
      try:
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token,
            'message': 'Register Successful!',
            'success': 'true',
        }, status=status.HTTP_201_CREATED)
      except Exception as e:
            return Response({
                'error': str(e),
                'success': 'false',
            }, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
#   renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    if User.objects.filter(email =email):
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            login(request, user)
            return Response({'user':UserSerializer(user).data,'token':token, 'message':'Login Successfully !', 'success':'true'}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Password Invalid !','success':'false'}, status=status.HTTP_404_NOT_FOUND)
    else:
       return Response({'message':'User does not exists!', 'success':'false'}, status=status.HTTP_400_BAD_REQUEST)
      

class UserProfileView(APIView):
  # renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response({'user':UserSerializer(request.user).data,'message':'User get successfully', 'success':'true'}, status=status.HTTP_200_OK)



  def put(self, request, formate = None):
    profile = request.user
    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'user':UserSerializer(request.user).data,'message':'Update  successfully !', 'success':'true'}, status=status.HTTP_200_OK)




class UserChangePasswordView(APIView):
  # renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    oldpassword = serializer.validated_data['oldPassword']
    password = serializer.validated_data['newPassword']
    password2 = serializer.validated_data['confirmPassword']
    user = request.user
    if user.check_password(oldpassword):
      if password != password2:
        return Response({'message':"Password doesn't match !",'success':'false'}, status = status.HTTP_400_BAD_REQUEST)
      user.set_password(password)
      user.save()
      return Response({'message':'Password Change Successfully !','success':'true'}, status=status.HTTP_200_OK)
    return Response({'message':"Old Password does not match !",'success':'false'}, status=status.HTTP_400_BAD_REQUEST)
    
   
  
class SendPasswordResetEmailView(APIView):
  # renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    try:
        # Attempt to validate the serializer
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # If validation is successful, return a success response
        return Response({'message': 'Verify your email!', 'success': 'true'}, status=status.HTTP_200_OK)

    except ValidationError as e:
        # Handle validation error, check if it's a non_field_errors case
        if 'non_field_errors' in e.detail:
            error_message = e.detail['non_field_errors'][0]
            return Response({'error': error_message, 'success': 'false'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Handle other validation errors
            return Response({'error': 'Invalid input', 'success': 'false'}, status=status.HTTP_400_BAD_REQUEST)



class UserPasswordResetView(APIView):
  # renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'message':'Password Reset Successfully !','success':'true'}, status=status.HTTP_200_OK)


# logout User
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        print("Received refresh token:", refresh_token)

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                print("Successfully logged out.")
                return Response({"detail": "Successfully logged out."})
            except Exception as e:
                print("Error during logout:", e)
                return Response({"detail": "Invalid token or token expired."}, status=400)
        else:
            print("Refresh token not provided.")
            return Response({"detail": "Refresh token not provided."}, status=400)
        


