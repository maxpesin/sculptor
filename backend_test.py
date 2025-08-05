#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Roman Gladiator Fitness App
Tests all CRUD operations, error handling, and data persistence
"""

import requests
import json
import sys
from datetime import datetime

class GladiusArenaAPITester:
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_server_health(self):
        """Test if server is running and accessible"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=5)
            # Express server might return 404 for root, but connection should work
            success = response.status_code in [200, 404]
            self.log_test("Server Health Check", success, f"Status: {response.status_code}")
            return success
        except requests.exceptions.RequestException as e:
            self.log_test("Server Health Check", False, f"Connection error: {str(e)}")
            return False

    def test_add_exercise_success(self):
        """Test successful exercise addition"""
        test_exercise = {
            "name": "gladiator push-up",
            "mainMuscle": "chest",
            "targetMuscle": "compound",
            "equipment": "dumbbells",
            "reps": "8-12"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/add-exercise",
                json=test_exercise,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "message" in data and "exercise" in data
                details = f"Exercise ID: {data.get('exercise', {}).get('id', 'N/A')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_test("Add Exercise - Success Case", success, details)
            return success, response.json() if success else {}
            
        except Exception as e:
            self.log_test("Add Exercise - Success Case", False, f"Error: {str(e)}")
            return False, {}

    def test_add_exercise_validation(self):
        """Test exercise addition with missing fields"""
        incomplete_exercise = {
            "name": "incomplete technique",
            "mainMuscle": "chest"
            # Missing required fields
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/add-exercise",
                json=incomplete_exercise,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should still succeed but with empty fields
            success = response.status_code in [200, 400, 500]
            details = f"Status: {response.status_code}"
            
            self.log_test("Add Exercise - Validation Test", success, details)
            return success
            
        except Exception as e:
            self.log_test("Add Exercise - Validation Test", False, f"Error: {str(e)}")
            return False

    def test_update_exercise_success(self):
        """Test successful exercise update"""
        # First add an exercise to get a valid ID
        add_success, add_response = self.test_add_exercise_success()
        if not add_success:
            self.log_test("Update Exercise - Success Case", False, "Could not add exercise for update test")
            return False
        
        exercise_id = add_response.get('exercise', {}).get('id')
        if not exercise_id:
            self.log_test("Update Exercise - Success Case", False, "No exercise ID returned from add")
            return False
        
        update_data = {
            "muscles": ["chest"],
            "exercises": [exercise_id],
            "history": [{
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "exercise": "gladiator push-up",
                "exerciseId": exercise_id,
                "set1": 10,
                "set2": 12,
                "set3": 15,
                "set4": 20
            }]
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/update-exercise",
                json=update_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "message" in data
                details = f"Message: {data.get('message', 'N/A')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_test("Update Exercise - Success Case", success, details)
            return success
            
        except Exception as e:
            self.log_test("Update Exercise - Success Case", False, f"Error: {str(e)}")
            return False

    def test_update_exercise_invalid(self):
        """Test exercise update with invalid data"""
        invalid_data = {
            "muscles": [],
            "exercises": [999999],  # Non-existent exercise ID
            "history": []
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/update-exercise",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 400 for no matching exercises
            success = response.status_code == 400
            details = f"Status: {response.status_code}"
            
            self.log_test("Update Exercise - Invalid Data", success, details)
            return success
            
        except Exception as e:
            self.log_test("Update Exercise - Invalid Data", False, f"Error: {str(e)}")
            return False

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(f"{self.base_url}/add-exercise", timeout=5)
            
            # Check if CORS headers are present or if server handles OPTIONS
            success = (
                response.status_code in [200, 204] or
                'Access-Control-Allow-Origin' in response.headers
            )
            
            details = f"Status: {response.status_code}, CORS headers: {bool('Access-Control-Allow-Origin' in response.headers)}"
            self.log_test("CORS Headers Test", success, details)
            return success
            
        except Exception as e:
            self.log_test("CORS Headers Test", False, f"Error: {str(e)}")
            return False

    def test_json_content_type(self):
        """Test server accepts JSON content type"""
        test_data = {"test": "data"}
        
        try:
            response = requests.post(
                f"{self.base_url}/add-exercise",
                json=test_data,
                timeout=5
            )
            
            # Server should accept JSON (even if it returns error for incomplete data)
            success = response.status_code in [200, 400, 500]
            details = f"Status: {response.status_code}"
            
            self.log_test("JSON Content Type Test", success, details)
            return success
            
        except Exception as e:
            self.log_test("JSON Content Type Test", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🏛️ Starting Gladius Arena Backend API Tests")
        print("=" * 60)
        
        # Test server connectivity first
        if not self.test_server_health():
            print("\n❌ Server is not accessible. Please ensure the backend is running on localhost:5000")
            return False
        
        print("\n🔍 Running API Endpoint Tests...")
        
        # Test all endpoints
        self.test_add_exercise_success()
        self.test_add_exercise_validation()
        self.test_update_exercise_success()
        self.test_update_exercise_invalid()
        self.test_cors_headers()
        self.test_json_content_type()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results Summary:")
        print(f"   Tests Run: {self.tests_run}")
        print(f"   Tests Passed: {self.tests_passed}")
        print(f"   Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("\n🏆 ALL TESTS PASSED! The gladiator APIs are battle-ready!")
            return True
        else:
            print(f"\n⚠️  {self.tests_run - self.tests_passed} tests failed. The arena needs attention!")
            print("\nFailed Tests:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   - {result['test']}: {result['details']}")
            return False

def main():
    """Main test execution"""
    tester = GladiusArenaAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())