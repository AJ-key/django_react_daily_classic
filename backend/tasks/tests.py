from rest_framework.test import APITestCase
from rest_framework import status
class TaskApiTests(APITestCase):
    def test_crud(self):
        url='/api/tasks/'
        r=self.client.post(url, {'title':'A','description':'B'}, format='json')
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)
        tid=r.data['id']
        self.assertEqual(self.client.get(url).status_code, 200)
        self.assertEqual(self.client.get(f'/api/tasks/{tid}/').status_code, 200)
        self.assertEqual(self.client.patch(f'/api/tasks/{tid}/', {'is_completed':True}, format='json').status_code, 200)
        self.assertEqual(self.client.delete(f'/api/tasks/{tid}/').status_code, 204)
