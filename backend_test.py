#!/usr/bin/env python3
"""
Comprehensive Backend Test Suite for Ring Builder API
Tests all endpoints, price calculations, quiz functionality, and database operations
"""

import requests
import json
import sys
import time
from typing import Dict, List, Any

# Get backend URL from frontend .env
BACKEND_URL = "https://ring-builder.preview.emergentagent.com/api"

class RingBuilderAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = []
        self.stones_data = []
        self.settings_data = []
        self.metals_data = []
        self.quiz_questions = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_health_check(self):
        """Test basic API health"""
        try:
            response = self.session.get(f"{self.base_url}/ring-builder/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_test("Health Check", True, f"API is healthy: {data}")
                return True
            else:
                self.log_test("Health Check", False, f"Health check failed with status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Health Check", False, f"Health check failed: {str(e)}")
            return False
    
    def test_get_stones(self):
        """Test GET /api/ring-builder/stones endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/ring-builder/stones", timeout=10)
            
            if response.status_code != 200:
                self.log_test("Get Stones", False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            stones = response.json()
            self.stones_data = stones
            
            # Validate response structure
            if not isinstance(stones, list):
                self.log_test("Get Stones", False, "Response is not a list")
                return False
            
            if len(stones) != 6:
                self.log_test("Get Stones", False, f"Expected 6 stones, got {len(stones)}")
                return False
            
            # Validate stone structure
            required_fields = ['id', 'name', 'type', 'cut', 'sizes', 'images', 'description']
            for stone in stones:
                for field in required_fields:
                    if field not in stone:
                        self.log_test("Get Stones", False, f"Missing field '{field}' in stone")
                        return False
                
                # Validate sizes structure
                if not stone['sizes'] or not isinstance(stone['sizes'], list):
                    self.log_test("Get Stones", False, f"Invalid sizes for stone {stone['name']}")
                    return False
                
                for size in stone['sizes']:
                    if not all(key in size for key in ['carat', 'price', 'availability']):
                        self.log_test("Get Stones", False, f"Invalid size structure in stone {stone['name']}")
                        return False
            
            # Check for expected cuts
            cuts = [stone['cut'] for stone in stones]
            expected_cuts = ['round', 'oval', 'princess', 'cushion', 'emerald', 'pear']
            if set(cuts) != set(expected_cuts):
                self.log_test("Get Stones", False, f"Expected cuts {expected_cuts}, got {cuts}")
                return False
            
            self.log_test("Get Stones", True, f"Successfully retrieved {len(stones)} moissanite stones with all cuts")
            return True
            
        except Exception as e:
            self.log_test("Get Stones", False, f"Exception: {str(e)}")
            return False
    
    def test_get_settings(self):
        """Test GET /api/ring-builder/settings endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/ring-builder/settings", timeout=10)
            
            if response.status_code != 200:
                self.log_test("Get Settings", False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            settings = response.json()
            self.settings_data = settings
            
            if not isinstance(settings, list):
                self.log_test("Get Settings", False, "Response is not a list")
                return False
            
            if len(settings) != 6:
                self.log_test("Get Settings", False, f"Expected 6 settings, got {len(settings)}")
                return False
            
            # Validate setting structure
            required_fields = ['id', 'name', 'base_price', 'images', 'description', 'personality_tags']
            for setting in settings:
                for field in required_fields:
                    if field not in setting:
                        self.log_test("Get Settings", False, f"Missing field '{field}' in setting")
                        return False
                
                if not isinstance(setting['base_price'], (int, float)) or setting['base_price'] <= 0:
                    self.log_test("Get Settings", False, f"Invalid base_price for setting {setting['name']}")
                    return False
            
            # Check for expected setting names
            names = [setting['name'] for setting in settings]
            expected_names = ['Classic Solitaire', 'Halo Setting', 'Vintage Inspired', 'Three Stone', 'Pavé Band', 'Tension Setting']
            if set(names) != set(expected_names):
                self.log_test("Get Settings", False, f"Expected settings {expected_names}, got {names}")
                return False
            
            self.log_test("Get Settings", True, f"Successfully retrieved {len(settings)} ring settings")
            return True
            
        except Exception as e:
            self.log_test("Get Settings", False, f"Exception: {str(e)}")
            return False
    
    def test_get_metals(self):
        """Test GET /api/ring-builder/metals endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/ring-builder/metals", timeout=10)
            
            if response.status_code != 200:
                self.log_test("Get Metals", False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            metals = response.json()
            self.metals_data = metals
            
            if not isinstance(metals, list):
                self.log_test("Get Metals", False, "Response is not a list")
                return False
            
            if len(metals) != 4:
                self.log_test("Get Metals", False, f"Expected 4 metals, got {len(metals)}")
                return False
            
            # Validate metal structure
            required_fields = ['id', 'name', 'type', 'multiplier', 'images', 'description']
            for metal in metals:
                for field in required_fields:
                    if field not in metal:
                        self.log_test("Get Metals", False, f"Missing field '{field}' in metal")
                        return False
                
                if not isinstance(metal['multiplier'], (int, float)) or metal['multiplier'] <= 0:
                    self.log_test("Get Metals", False, f"Invalid multiplier for metal {metal['name']}")
                    return False
            
            # Check for expected metal names
            names = [metal['name'] for metal in metals]
            expected_names = ['14K White Gold', '14K Yellow Gold', '14K Rose Gold', 'Platinum']
            if set(names) != set(expected_names):
                self.log_test("Get Metals", False, f"Expected metals {expected_names}, got {names}")
                return False
            
            self.log_test("Get Metals", True, f"Successfully retrieved {len(metals)} metal options")
            return True
            
        except Exception as e:
            self.log_test("Get Metals", False, f"Exception: {str(e)}")
            return False
    
    def test_get_quiz_questions(self):
        """Test GET /api/ring-builder/quiz/questions endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/ring-builder/quiz/questions", timeout=10)
            
            if response.status_code != 200:
                self.log_test("Get Quiz Questions", False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            questions = response.json()
            self.quiz_questions = questions
            
            if not isinstance(questions, list):
                self.log_test("Get Quiz Questions", False, "Response is not a list")
                return False
            
            if len(questions) != 4:
                self.log_test("Get Quiz Questions", False, f"Expected 4 questions, got {len(questions)}")
                return False
            
            # Validate question structure
            for question in questions:
                if not all(key in question for key in ['id', 'question', 'options']):
                    self.log_test("Get Quiz Questions", False, f"Invalid question structure")
                    return False
                
                if not isinstance(question['options'], list) or len(question['options']) != 5:
                    self.log_test("Get Quiz Questions", False, f"Expected 5 options per question, got {len(question['options'])}")
                    return False
                
                for option in question['options']:
                    if not all(key in option for key in ['text', 'personality']):
                        self.log_test("Get Quiz Questions", False, f"Invalid option structure")
                        return False
            
            self.log_test("Get Quiz Questions", True, f"Successfully retrieved {len(questions)} quiz questions")
            return True
            
        except Exception as e:
            self.log_test("Get Quiz Questions", False, f"Exception: {str(e)}")
            return False
    
    def test_price_calculation(self):
        """Test POST /api/ring-builder/calculate-price endpoint"""
        if not all([self.stones_data, self.settings_data, self.metals_data]):
            self.log_test("Price Calculation", False, "Missing prerequisite data (stones, settings, metals)")
            return False
        
        try:
            # Use first available stone, setting, and metal
            stone = self.stones_data[0]
            setting = self.settings_data[0]
            metal = self.metals_data[0]
            carat = stone['sizes'][0]['carat']
            
            payload = {
                "stone_id": stone['id'],
                "setting_id": setting['id'],
                "metal_id": metal['id'],
                "carat": carat
            }
            
            response = self.session.post(
                f"{self.base_url}/ring-builder/calculate-price",
                json=payload,
                timeout=10
            )
            
            if response.status_code != 200:
                self.log_test("Price Calculation", False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            price_data = response.json()
            
            # Validate response structure
            required_fields = ['total_price', 'breakdown', 'details']
            for field in required_fields:
                if field not in price_data:
                    self.log_test("Price Calculation", False, f"Missing field '{field}' in response")
                    return False
            
            # Validate breakdown structure
            breakdown = price_data['breakdown']
            breakdown_fields = ['stone', 'setting', 'metal_adjustment']
            for field in breakdown_fields:
                if field not in breakdown:
                    self.log_test("Price Calculation", False, f"Missing field '{field}' in breakdown")
                    return False
            
            # Validate price calculation logic
            expected_stone_price = stone['sizes'][0]['price']
            expected_setting_price = setting['base_price']
            expected_metal_adjustment = (expected_stone_price + expected_setting_price) * (metal['multiplier'] - 1.0)
            expected_total = expected_stone_price + expected_setting_price + expected_metal_adjustment
            
            if abs(price_data['total_price'] - expected_total) > 0.01:
                self.log_test("Price Calculation", False, f"Price calculation mismatch. Expected: {expected_total}, Got: {price_data['total_price']}")
                return False
            
            self.log_test("Price Calculation", True, f"Price calculated correctly: ${price_data['total_price']}")
            return True
            
        except Exception as e:
            self.log_test("Price Calculation", False, f"Exception: {str(e)}")
            return False
    
    def test_quiz_analysis(self):
        """Test POST /api/ring-builder/quiz/analyze endpoint"""
        if not self.quiz_questions:
            self.log_test("Quiz Analysis", False, "Missing quiz questions data")
            return False
        
        try:
            # Create sample answers (all classic personality)
            answers = []
            for question in self.quiz_questions:
                # Find classic option
                classic_option = next((opt for opt in question['options'] if opt['personality'] == 'classic'), None)
                if classic_option:
                    answers.append({
                        "questionId": str(question['id']),
                        "personality": classic_option['personality']
                    })
            
            payload = {"answers": answers}
            
            response = self.session.post(
                f"{self.base_url}/ring-builder/quiz/analyze",
                json=payload,
                timeout=10
            )
            
            if response.status_code != 200:
                self.log_test("Quiz Analysis", False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            analysis = response.json()
            
            # Validate response structure
            required_fields = ['personality', 'recommendation', 'confidence']
            for field in required_fields:
                if field not in analysis:
                    self.log_test("Quiz Analysis", False, f"Missing field '{field}' in response")
                    return False
            
            # Validate recommendation structure
            recommendation = analysis['recommendation']
            rec_fields = ['stone', 'setting', 'metal', 'description']
            for field in rec_fields:
                if field not in recommendation:
                    self.log_test("Quiz Analysis", False, f"Missing field '{field}' in recommendation")
                    return False
            
            # Since all answers were classic, personality should be classic
            if analysis['personality'] != 'classic':
                self.log_test("Quiz Analysis", False, f"Expected 'classic' personality, got '{analysis['personality']}'")
                return False
            
            self.log_test("Quiz Analysis", True, f"Quiz analyzed correctly: {analysis['personality']} personality")
            return True
            
        except Exception as e:
            self.log_test("Quiz Analysis", False, f"Exception: {str(e)}")
            return False
    
    def test_configuration_management(self):
        """Test configuration save and retrieve endpoints"""
        if not all([self.stones_data, self.settings_data, self.metals_data]):
            self.log_test("Configuration Management", False, "Missing prerequisite data")
            return False
        
        try:
            # Save a configuration
            stone = self.stones_data[0]
            setting = self.settings_data[0]
            metal = self.metals_data[0]
            carat = stone['sizes'][0]['carat']
            
            save_payload = {
                "stone_id": stone['id'],
                "setting_id": setting['id'],
                "metal_id": metal['id'],
                "carat": carat,
                "personality_type": "classic"
            }
            
            save_response = self.session.post(
                f"{self.base_url}/ring-builder/configurations",
                params=save_payload,
                timeout=10
            )
            
            if save_response.status_code != 200:
                self.log_test("Configuration Save", False, f"HTTP {save_response.status_code}: {save_response.text}")
                return False
            
            save_data = save_response.json()
            
            # Validate save response
            if 'configuration_id' not in save_data:
                self.log_test("Configuration Save", False, "Missing configuration_id in save response")
                return False
            
            config_id = save_data['configuration_id']
            
            # Retrieve the configuration
            get_response = self.session.get(
                f"{self.base_url}/ring-builder/configurations/{config_id}",
                timeout=10
            )
            
            if get_response.status_code != 200:
                self.log_test("Configuration Retrieve", False, f"HTTP {get_response.status_code}: {get_response.text}")
                return False
            
            config_data = get_response.json()
            
            # Validate retrieved configuration
            required_fields = ['id', 'stone_id', 'setting_id', 'metal_id', 'carat', 'total_price']
            for field in required_fields:
                if field not in config_data:
                    self.log_test("Configuration Retrieve", False, f"Missing field '{field}' in configuration")
                    return False
            
            # Verify data matches
            if config_data['stone_id'] != stone['id']:
                self.log_test("Configuration Management", False, "Stone ID mismatch")
                return False
            
            if config_data['setting_id'] != setting['id']:
                self.log_test("Configuration Management", False, "Setting ID mismatch")
                return False
            
            if config_data['metal_id'] != metal['id']:
                self.log_test("Configuration Management", False, "Metal ID mismatch")
                return False
            
            self.log_test("Configuration Management", True, f"Configuration saved and retrieved successfully: {config_id}")
            return True
            
        except Exception as e:
            self.log_test("Configuration Management", False, f"Exception: {str(e)}")
            return False
    
    def test_error_handling(self):
        """Test error handling for invalid requests"""
        tests_passed = 0
        total_tests = 4
        
        try:
            # Test invalid stone ID in price calculation
            invalid_payload = {
                "stone_id": "invalid-id",
                "setting_id": self.settings_data[0]['id'] if self.settings_data else "test",
                "metal_id": self.metals_data[0]['id'] if self.metals_data else "test",
                "carat": 1.0
            }
            
            response = self.session.post(
                f"{self.base_url}/ring-builder/calculate-price",
                json=invalid_payload,
                timeout=10
            )
            
            if response.status_code == 400:
                tests_passed += 1
                print("   ✓ Invalid stone ID properly rejected")
            else:
                print(f"   ✗ Invalid stone ID test failed: {response.status_code}")
            
            # Test invalid carat size
            if self.stones_data:
                invalid_carat_payload = {
                    "stone_id": self.stones_data[0]['id'],
                    "setting_id": self.settings_data[0]['id'] if self.settings_data else "test",
                    "metal_id": self.metals_data[0]['id'] if self.metals_data else "test",
                    "carat": 999.0  # Invalid carat size
                }
                
                response = self.session.post(
                    f"{self.base_url}/ring-builder/calculate-price",
                    json=invalid_carat_payload,
                    timeout=10
                )
                
                if response.status_code == 400:
                    tests_passed += 1
                    print("   ✓ Invalid carat size properly rejected")
                else:
                    print(f"   ✗ Invalid carat size test failed: {response.status_code}")
            
            # Test invalid configuration ID
            response = self.session.get(
                f"{self.base_url}/ring-builder/configurations/invalid-id",
                timeout=10
            )
            
            if response.status_code == 404:
                tests_passed += 1
                print("   ✓ Invalid configuration ID properly rejected")
            else:
                print(f"   ✗ Invalid configuration ID test failed: {response.status_code}")
            
            # Test malformed quiz analysis
            response = self.session.post(
                f"{self.base_url}/ring-builder/quiz/analyze",
                json={"invalid": "data"},
                timeout=10
            )
            
            if response.status_code in [400, 422]:
                tests_passed += 1
                print("   ✓ Malformed quiz data properly rejected")
            else:
                print(f"   ✗ Malformed quiz data test failed: {response.status_code}")
            
            success = tests_passed == total_tests
            self.log_test("Error Handling", success, f"Passed {tests_passed}/{total_tests} error handling tests")
            return success
            
        except Exception as e:
            self.log_test("Error Handling", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print(f"🧪 Starting Ring Builder API Tests")
        print(f"🔗 Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test sequence
        tests = [
            ("Health Check", self.test_health_check),
            ("Get Stones", self.test_get_stones),
            ("Get Settings", self.test_get_settings),
            ("Get Metals", self.test_get_metals),
            ("Get Quiz Questions", self.test_get_quiz_questions),
            ("Price Calculation", self.test_price_calculation),
            ("Quiz Analysis", self.test_quiz_analysis),
            ("Configuration Management", self.test_configuration_management),
            ("Error Handling", self.test_error_handling)
        ]
        
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests:
            print(f"\n🔍 Running {test_name}...")
            if test_func():
                passed += 1
            time.sleep(0.5)  # Brief pause between tests
        
        print("\n" + "=" * 60)
        print(f"📊 TEST SUMMARY")
        print(f"✅ Passed: {passed}/{total}")
        print(f"❌ Failed: {total - passed}/{total}")
        
        if passed == total:
            print("🎉 ALL TESTS PASSED! Ring Builder API is working correctly.")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return False

def main():
    """Main test execution"""
    tester = RingBuilderAPITester()
    success = tester.run_all_tests()
    
    # Print detailed results for failed tests
    failed_tests = [test for test in tester.test_results if not test['success']]
    if failed_tests:
        print("\n" + "=" * 60)
        print("🔍 FAILED TEST DETAILS:")
        for test in failed_tests:
            print(f"\n❌ {test['test']}")
            print(f"   Message: {test['message']}")
            if test['details']:
                print(f"   Details: {test['details']}")
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())