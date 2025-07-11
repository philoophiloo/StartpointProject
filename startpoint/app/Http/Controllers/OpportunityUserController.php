<?php

namespace App\Http\Controllers;

use App\Models\OpportunityUser;
use Illuminate\Http\Request;

class OpportunityUserController extends Controller
{
    // Get all user-opportunity assignments
    public function index()
    {
        return response()->json(OpportunityUser::all());
    }

    // Assign a user to an opportunity
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'opportunity_id' => 'required|exists:opportunities,id',
            'is_active' => 'boolean',
        ]);

        $opportunityUser = OpportunityUser::create($validated);
        return response()->json($opportunityUser, 201);
    }

    // View a specific assignment
    public function show($id)
    {
        $record = OpportunityUser::find($id);
        return $record
            ? response()->json($record)
            : response()->json(['message' => 'Record not found'], 404);
    }

    // Update a specific assignment
    public function update(Request $request, $id)
    {
        $record = OpportunityUser::find($id);
        if (!$record) return response()->json(['message' => 'Record not found'], 404);

        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'opportunity_id' => 'sometimes|exists:opportunities,id',
            'is_active' => 'boolean',
        ]);

        $record->update($validated);
        return response()->json($record);
    }

    // Remove the assignment
    public function destroy($id)
    {
        $record = OpportunityUser::find($id);
        if (!$record) return response()->json(['message' => 'Record not found'], 404);

        $record->delete();
        return response()->json(['message' => 'Assignment deleted successfully']);
    }
}
