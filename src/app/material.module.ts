import { NgModule } from '@angular/core';
import { 
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
    ],
})

export class MaterialModule { }
