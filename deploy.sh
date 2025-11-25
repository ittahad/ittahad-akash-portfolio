#!/bin/bash

# Firebase Deployment Script for Linux/Mac (Bash)
# Portfolio Website Deployment

echo "🚀 Starting Firebase Deployment..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check if Firebase CLI is installed
echo -e "${YELLOW}📦 Checking Firebase CLI installation...${NC}"
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI not found!${NC}"
    echo -e "${YELLOW}Installing Firebase CLI...${NC}"
    npm install -g firebase-tools
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Firebase CLI${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Firebase CLI installed successfully!${NC}"
else
    echo -e "${GREEN}✅ Firebase CLI is already installed${NC}"
fi

echo ""

# Check if user is logged in
echo -e "${YELLOW}🔐 Checking Firebase authentication...${NC}"
firebase projects:list &> /dev/null

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Not logged in to Firebase${NC}"
    echo -e "${CYAN}Opening Firebase login...${NC}"
    firebase login
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Firebase login failed${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Authenticated with Firebase${NC}"
echo ""

# Check if .firebaserc exists and has a valid project
echo -e "${YELLOW}🔍 Checking Firebase project configuration...${NC}"

if [ -f ".firebaserc" ]; then
    PROJECT_ID=$(grep -o '"default": "[^"]*' .firebaserc | grep -o '[^"]*$')
    
    if [ "$PROJECT_ID" = "your-project-id" ]; then
        echo -e "${YELLOW}⚠️  Firebase project not configured!${NC}"
        echo -e "${CYAN}Please update .firebaserc with your Firebase project ID${NC}"
        echo ""
        echo -e "${NC}You can:${NC}"
        echo -e "${NC}1. Run 'firebase use --add' to select a project${NC}"
        echo -e "${NC}2. Or manually edit .firebaserc and replace 'your-project-id'${NC}"
        echo ""
        
        read -p "Do you want to select a project now? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            firebase use --add
            if [ $? -ne 0 ]; then
                echo -e "${RED}❌ Failed to configure Firebase project${NC}"
                exit 1
            fi
        else
            echo -e "${RED}❌ Deployment cancelled${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}✅ Using Firebase project: $PROJECT_ID${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .firebaserc not found!${NC}"
    echo -e "${CYAN}Initializing Firebase project...${NC}"
    firebase use --add
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to initialize Firebase project${NC}"
        exit 1
    fi
fi

echo ""

# Deploy to Firebase
echo -e "${CYAN}🚀 Deploying to Firebase Hosting...${NC}"
echo ""

firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo ""
    echo -e "${CYAN}🌐 Your portfolio is now live!${NC}"
    echo ""
    
    # Get the hosting URL
    PROJECT_ID=$(grep -o '"default": "[^"]*' .firebaserc | grep -o '[^"]*$')
    echo -e "${NC}📍 URL: https://$PROJECT_ID.web.app${NC}"
    echo -e "${NC}📍 Custom domain: https://$PROJECT_ID.firebaseapp.com${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Deployment failed!${NC}"
    echo -e "${YELLOW}Please check the error messages above${NC}"
    exit 1
fi
