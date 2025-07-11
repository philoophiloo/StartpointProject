<?php

namespace App\Http\Controllers;

use App\Models\Cohort;
use Illuminate\Http\Request;

class CohortController extends Controller
{
    // ✅ GET: /api/cohorts
    public function index()
    {
        return response()->json(Cohort::all(), 200);
    }

    // ✅ POST: /api/cohorts
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'code_name' => 'required|string|max:150',
            'president' => 'required|string|max:150',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $cohort = Cohort::create($validated);
        return response()->json($cohort, 201);
    }

    // ✅ GET: /api/cohorts/{id}
    public function show($id)
    {
        $cohort = Cohort::find($id);
        if (!$cohort) return response()->json(['message' => 'Not found'], 404);
        return response()->json($cohort);
    }

    // ✅ PUT/PATCH: /api/cohorts/{id}
    public function update(Request $request, $id)
    {
        $cohort = Cohort::find($id);
        if (!$cohort) return response()->json(['message' => 'Not found'], 404);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:150',
            'code_name' => 'sometimes|string|max:150',
            'president' => 'sometimes|string|max:150',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $cohort->update($validated);
        return response()->json($cohort);
    }

    // ✅ DELETE: /api/cohorts/{id}
    public function destroy($id)
    {
        $cohort = Cohort::find($id);
        if (!$cohort) return response()->json(['message' => 'Not found'], 404);

        $cohort->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
