import { Component, DebugElement } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UppercaseDirective } from "./uppercase.directive"
import { By } from "@angular/platform-browser"

@Component({
    template: `<input type="text" appUppercase>`
})
class TestHostComponent {}

describe('UppercaseDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>
    let inputElement: DebugElement

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [UppercaseDirective],
            declarations: [TestHostComponent]
        })
        fixture = TestBed.createComponent(TestHostComponent)
        inputElement = fixture.debugElement.query(By.directive(UppercaseDirective))
    })

    it('should convert input to uppercase', () => {
        inputElement.nativeElement.value = 'test'
        inputElement.triggerEventHandler('input', { target: inputElement.nativeElement })
        fixture.detectChanges()
        expect(inputElement.nativeElement.value).toBe('TEST')
    })
})