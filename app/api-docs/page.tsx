import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Chennai Women Safety API</h1>
          <p className="text-gray-600">REST API documentation for mobile app integration</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="destructive">POST</Badge>
                /api/alerts
              </CardTitle>
              <CardDescription>Send new safety alert from mobile app</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Request Body:</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {`{
  "userId": "WOMEN123",
  "lat": 13.0415,
  "lng": 80.2345,
  "type": "Harassment"
}`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response:</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {`{
  "success": true,
  "data": {
    "id": "2",
    "userId": "WOMEN123",
    "lat": 13.0415,
    "lng": 80.2345,
    "type": "Harassment",
    "nearestStation": "T Nagar Police Station",
    "status": "New",
    "timestamp": "2025-09-29T17:15:00Z"
  },
  "message": "Alert created successfully"
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">GET</Badge>
                /api/alerts
              </CardTitle>
              <CardDescription>Fetch all active alerts for dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-semibold mb-2">Response:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`{
  "success": true,
  "data": [
    {
      "id": "1",
      "userId": "WOMEN123",
      "lat": 13.0415,
      "lng": 80.2345,
      "type": "Harassment",
      "nearestStation": "T Nagar Police Station",
      "status": "New",
      "timestamp": "2025-09-29T17:15:00Z"
    }
  ]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline">PATCH</Badge>
                /api/alerts/:id
              </CardTitle>
              <CardDescription>Update alert status (Responding/Resolved)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Request Body:</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {`{
  "status": "Responding"
}`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Valid status values: <code>New</code>, <code>Responding</code>, <code>Resolved</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">GET</Badge>
                /api/alerts/:id/status
              </CardTitle>
              <CardDescription>Get status of specific alert (for mobile app polling)</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-semibold mb-2">Response:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`{
  "success": true,
  "data": {
    "id": "1",
    "status": "Responding",
    "timestamp": "2025-09-29T17:15:00Z",
    "updatedAt": "2025-09-29T17:20:00Z"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">GET</Badge>
                /api/police-stations
              </CardTitle>
              <CardDescription>Get all police stations with coordinates</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-semibold mb-2">Response:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`{
  "success": true,
  "data": [
    {
      "name": "T Nagar Police Station",
      "lat": 13.0415,
      "lng": 80.2345
    },
    {
      "name": "Mylapore Police Station", 
      "lat": 13.0324,
      "lng": 80.2702
    }
  ]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">GET</Badge>
                /api/cctv
              </CardTitle>
              <CardDescription>Get all CCTV locations and feed URLs</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-semibold mb-2">Response:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`{
  "success": true,
  "data": [
    {
      "id": "cctv_001",
      "name": "Marina Beach Junction",
      "lat": 13.0500,
      "lng": 80.2824,
      "feedUrl": "/videos/marina-beach.mp4",
      "status": "active"
    }
  ]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
